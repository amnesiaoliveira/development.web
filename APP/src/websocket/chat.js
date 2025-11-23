// src/websocket/chat.js → substitua todo o arquivo por este
module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Token faltando'));

    try {
      const payload = require('jsonwebtoken').verify(token, 'serviconecta2025-chave-super-secreta');
      socket.usuario = payload;
      next();
    } catch (err) {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.usuario.nome);

    // Entrar na sala da demanda
    socket.on('entrarDemanda', (demandaId) => {
      socket.join(demandaId);
      console.log(`${socket.usuario.nome} entrou na demanda ${demandaId}`);
    });

    // Enviar mensagem
    socket.on('enviarMensagem', async ({ demandaId, mensagem }) => {
      if (!mensagem.trim()) return;

      const db = require('../server').app.get('db'); // pega o pool
      const msgId = require('uuid').v4();

      try {
        await db.query(
          'INSERT INTO mensagens (id, demanda_id, usuario_id, mensagem) VALUES (?, ?, ?, ?)',
          [msgId, demandaId, socket.usuario.id, mensagem]
        );

        const msgData = {
          id: msgId,
          mensagem,
          usuario_nome: socket.usuario.nome,
          criado_em: new Date().toISOString(),
          meu: true
        };

        io.to(demandaId).emit('novaMensagem', msgData);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectado:', socket.usuario.nome);
    });
  });
};