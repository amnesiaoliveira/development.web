// src/websocket/chat.js → VERSÃO FINAL E GARANTIDA
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports = (io, db) => {
  // Middleware de autenticação do Socket.IO
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) return next(new Error('Token ausente'));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'serviconecta2025-chave-super-secreta');
      socket.usuario = payload;
      next();
    } catch (err) {
      return next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Chat conectado: ${socket.usuario.nome} (${socket.usuario.id})`);

    socket.on('entrarDemanda', (demandaId) => {
      socket.join(demandaId)
  });

    socket.on('enviarMensagem', async ({ demandaId, mensagem }) => {
      const texto = mensagem?.trim();
      if (!texto || !demandaId) return;

      const msgId = uuidv4();

      try {
        await db.query(
          `INSERT INTO mensagens (id, demanda_id, usuario_id, mensagem, criado_em)
           VALUES (?, ?, ?, ?, NOW())`,
          [msgId, demandaId, socket.usuario.id, texto]
        );

        const msg = {
          id: msgId,
          demanda_id: demandaId,
          usuario_id: socket.usuario.id,
          usuario_nome: socket.usuario.nome,
          mensagem: texto,
          criado_em: new Date().toISOString()
        };

        // Envia para todos na sala (inclusive quem enviou)
        io.to(demandaId).emit('novaMensagem', msg);

      } catch (err) {
        console.error('Erro ao salvar mensagem:', err);
        socket.emit('erroMensagem', { erro: 'Falha ao enviar mensagem' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Chat desconectado: ${socket.usuario.nome}`);
    });
  });
};