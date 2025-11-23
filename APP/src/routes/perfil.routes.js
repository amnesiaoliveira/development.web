// src/routes/perfil.routes.js
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { verificarToken } = require('../middleware/auth');
const router = express.Router();

// Upload de foto de perfil
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/fotos/perfil'),
  filename: (req, file, cb) => cb(null, req.usuario.id + path.extname(file.originalname))
});
const upload = multer({ storage });

// BUSCAR PERFIL
router.get('/', verificarToken, async (req, res) => {
  const db = req.app.get('db');
  try {
    const [rows] = await db.query('SELECT * FROM perfil_profissional WHERE usuario_id = ?', [req.usuario.id]);
    res.json(rows[0] || { raio_atuacao_km: 20, categorias: [] });
  } catch (err) {
    res.status(500).json({});
  }
});

router.post('/', verificarToken, upload.single('foto_perfil'), async (req, res) => {
  if (req.usuario.tipo !== 'PROFISSIONAL') return res.status(403).json({});

  const { bio, raio_atuacao_km, categorias } = req.body;
  const foto_perfil = req.file ? `/fotos/perfil/${req.file.filename}` : null;

  // GARANTE QUE CATEGORIAS SEJA UM JSON VÁLIDO
  let categoriasJson = '[]';
  if (categorias) {
    try {
      categoriasJson = typeof categorias === 'string' ? categorias : JSON.stringify(categorias);
    } catch (e) {
      categoriasJson = '[]';
    }
  }

  const db = req.app.get('db');

  try {
    const [existe] = await db.query('SELECT 1 FROM perfil_profissional WHERE usuario_id = ?', [req.usuario.id]);

    if (existe.length > 0) {
      await db.query(`
        UPDATE perfil_profissional 
        SET bio = ?, raio_atuacao_km = ?, categorias = ?, foto_perfil = COALESCE(?, foto_perfil)
        WHERE usuario_id = ?
      `, [bio || null, raio_atuacao_km || 20, categoriasJson, foto_perfil, req.usuario.id]);
    } else {
      await db.query(`
        INSERT INTO perfil_profissional 
        (usuario_id, bio, raio_atuacao_km, categorias, foto_perfil)
        VALUES (?, ?, ?, ?, ?)
      `, [req.usuario.id, bio || null, raio_atuacao_km || 20, categoriasJson, foto_perfil]);
    }

    res.json({ ok: true, mensagem: 'Perfil salvo com sucesso!' });
  } catch (err) {
    console.error('Erro ao salvar perfil:', err);
    res.status(500).json({ mensagem: 'Erro ao salvar' });
  }
});

module.exports = router;