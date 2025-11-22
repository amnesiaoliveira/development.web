// src/routes/demanda.routes.js
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'serviconecta2025-chave-super-secreta';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/fotos'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + uuidv4().slice(0,8) + path.extname(file.originalname))
});
const upload = multer({ storage });

const verificarToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token faltando' });
  }

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (err) {
    console.error('Token inválido:', err.message);
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};

// Criar demanda (agora funciona!)
router.post('/', verificarToken, upload.single('foto'), async (req, res) => {
  if (req.usuario.tipo !== 'CLIENTE') {
    return res.status(403).json({ mensagem: 'Acesso negado' });
  }

  const { titulo, categoria_id, descricao, cep, raio_desejado_km, orcamento_estimado } = req.body;
  const fotoPath = req.file ? `/fotos/${req.file.filename}` : null;

  const db = req.app.get('db');
  const demandaId = uuidv4();
  const fotoId = uuidv4();

  try {
    // Insere a demanda
    await db.query(`
      INSERT INTO demandas 
      (id, titulo, descricao, categoria_id, cep, raio_desejado_km, orcamento_estimado, cliente_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT id FROM clientes WHERE usuario_id = ?), 'ABERTA')
    `, [demandaId, titulo, descricao, categoria_id, cep, raio_desejado_km || 15, orcamento_estimado || null, req.usuario.id]);

    // Insere foto se existir
    if (fotoPath) {
      await db.query(
        'INSERT INTO fotos (id, url, tipo, demanda_id) VALUES (?, ?, "PROBLEMA", ?)',
        [fotoId, fotoPath, demandaId]
      );
    }

    res.json({ ok: true, mensagem: 'Demanda criada com sucesso!' });
  } catch (err) {
    console.error('Erro ao criar demanda:', err);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Minhas demandas
router.get('/minhas', verificarToken, async (req, res) => {
  if (req.usuario.tipo !== 'CLIENTE') return res.status(403).json({});

  const db = req.app.get('db');
  const [rows] = await db.query(`
    SELECT d.*, c.nome as categoria_nome, f.url as foto_url
    FROM demandas d
    JOIN categorias c ON d.categoria_id = c.id
    LEFT JOIN fotos f ON f.demanda_id = d.id AND f.tipo = 'PROBLEMA'
    WHERE d.cliente_id = (SELECT id FROM clientes WHERE usuario_id = ?)
    ORDER BY d.criado_em DESC
  `, [req.usuario.id]);

  res.json(rows);
});

module.exports = router;