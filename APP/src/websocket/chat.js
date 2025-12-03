// src/websocket/chat.js → VERSÃO CORRIGIDA E MELHORADA
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports = (io) => {
  // Middleware de autenticação do Socket.IO
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error('Token de autenticação ausente'));
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'serviconecta2025-chave-super-secreta');
      socket.usuario = payload; // { id, nome, tipo, ... }
      next();
    } catch (err) {
      return next(new Error('Token inválido ou expirado'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Usuário conectado no chat: ${socket.usuario.nome} (${socket.usuario.id})`);

    // Entrar na sala da demanda
    socket.on('entrarDemanda', (demandaId) => {
      if (!demandaId) return;
      socket.join(demandaId);
      console.log(`${socket.usuario.nome} entrou na sala da demanda: ${demandaId}`);
    });

    // Enviar mensagem
    socket.on('enviarMensagem', async ({ demandaId, mensagem }) => {
      const texto = mensagem?.trim();
      if (!texto || !demandaId) return;

      const db = require('../server').app.get('db');
      const msgId = uuidv4();

      try {
        await db.query(
          `INSERT INTO mensagens (id, demanda_id, usuario_id, mensagem, criado_em)
           VALUES (?, ?, ?, ?, NOW())`,
          [msgId, demandaId, socket.usuario.id, texto]
        );

        // Dados completos que o frontend precisa
        const mensagemParaEnviar = {
          id: msgId,
          demanda_id: demandaId,
          usuario_id: socket.usuario.id,
          usuario_nome: socket.usuario.nome,
          mensagem: texto,
          criado_em: new Date().toISOString()
        };

        // Envia para todos na sala (incluindo o remetente)
        io.to(demandaId).emit('novaMensagem', mensagemParaEnviar);

      } catch (err) {
        console.error('Erro ao salvar mensagem no banco:', err);
        socket.emit('erroMensagem', { erro: 'Falha ao enviar mensagem' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Usuário desconectado do chat: ${socket.usuario.nome}`);
    });
  });
};