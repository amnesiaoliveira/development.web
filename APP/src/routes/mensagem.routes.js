const express = require('express');
const { verificarToken } = require('../middleware/auth');
const router = express.Router();

router.get('/:demandaId', verificarToken, async (req, res) => {
  const db = req.app.get('db');
  const { demandaId } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT m.*, u.nome as usuario_nome
      FROM mensagens m
      JOIN usuarios u ON m.usuario_id = u.id
      WHERE m.demanda_id = ?
      ORDER BY m.criado_em ASC
    `, [demandaId]);
    res.json(rows);
  } catch (err) {
    res.json([]);
  }
});

module.exports = router;