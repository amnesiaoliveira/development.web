// src/routes/categoria.routes.js
const express = require('express');
const router = express.Router();

// Rota pública – não precisa de login
router.get('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const [rows] = await db.query('SELECT id, nome FROM categorias ORDER BY nome');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar categorias:', err);
    res.status(500).json([]);
  }
});

module.exports = router;