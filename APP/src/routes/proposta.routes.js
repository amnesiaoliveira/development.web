const express = require('express');
const { verificarToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/', verificarToken, async (req, res) => {
  if (req.usuario.tipo !== 'PROFISSIONAL') {
    return res.status(403).json({ erro: 'Acesso negado' });
  }

  const { demanda_id, valor, prazo_dias, mensagem } = req.body;

  if (!demanda_id || !valor || !prazo_dias) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
  }

  const db = req.app.get('db');
  const propostaId = uuidv4();

  try {
    const [[demanda]] = await db.query(
      'SELECT id, status FROM demandas WHERE id = ? AND status = "ABERTA"',
      [demanda_id]
    );

    if (!demanda) {
      return res.status(404).json({ erro: 'Demanda não encontrada ou já fechada' });
    }

    const [[jaEnviou]] = await db.query(
      'SELECT 1 FROM propostas WHERE demanda_id = ? AND profissional_id = ?',
      [demanda_id, req.usuario.id]
    );

    if (jaEnviou) {
      return res.status(409).json({ erro: 'Você já enviou uma proposta para essa demanda' });
    }

    await db.query(
      `INSERT INTO propostas 
       (id, demanda_id, profissional_id, valor, prazo_dias, mensagem, status)
       VALUES (?, ?, ?, ?, ?, ?, 'ENVIADA')`,
      [propostaId, demanda_id, req.usuario.id, valor, prazo_dias, mensagem || null]
    );

    const io = req.app.get('io');
    io.to(demanda_id).emit('novaProposta', {
      id: propostaId,
      profissional_nome: req.usuario.nome,
      valor: Number(valor),
      prazo_dias: Number(prazo_dias),
      mensagem: mensagem || '',
      criado_em: new Date().toISOString()
    });

    res.json({ sucesso: true, mensagem: 'Proposta enviada com sucesso!' });

  } catch (err) {
    console.error('Erro ao enviar proposta:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

module.exports = router;