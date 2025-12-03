const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { verificarToken } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/fotos'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + uuidv4().slice(0,8) + path.extname(file.originalname))
});
const upload = multer({ storage });

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
    await db.query(`
      INSERT INTO demandas 
        (id, titulo, descricao, categoria_id, cep, raio_desejado_km, orcamento_estimado, cliente_id, status, criado_em)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ABERTA', NOW())
    `, [
      demandaId,
      titulo,
      descricao,
      categoria_id,
      cep,
      raio_desejado_km || 15,
      orcamento_estimado || null,
      req.usuario.id
    ]);

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

router.get('/minhas', verificarToken, async (req, res) => {
  if (req.usuario.tipo !== 'CLIENTE') return res.status(403).json({});

  const db = req.app.get('db');

  try {
    const [rows] = await db.query(`
      SELECT d.*, c.nome AS categoria_nome, f.url AS foto_url
      FROM demandas d
      JOIN categorias c ON d.categoria_id = c.id
      LEFT JOIN fotos f ON f.demanda_id = d.id AND f.tipo = 'PROBLEMA'
      WHERE d.cliente_id = ?
      ORDER BY d.criado_em DESC
    `, [req.usuario.id]);

    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar demandas:', err);
    res.json([]);
  }
});

router.get('/proximas', verificarToken, async (req, res) => {
  if (req.usuario.tipo !== 'PROFISSIONAL') return res.status(403).json({});

  const db = req.app.get('db');
  try {
    const [rows] = await db.query(`
      SELECT d.*, c.nome as categoria_nome, f.url as foto_url, u.nome as cliente_nome
      FROM demandas d
      JOIN categorias c ON d.categoria_id = c.id
      LEFT JOIN fotos f ON f.demanda_id = d.id AND f.tipo = 'PROBLEMA'
      JOIN usuarios u ON d.cliente_id = u.id
      WHERE d.status = 'ABERTA'
      ORDER BY d.criado_em DESC
      LIMIT 20
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});
module.exports = router;