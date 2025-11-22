const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const JWT_SECRET = 'serviconecta2025-chave-super-secreta';

router.post('/cadastro', async (req, res) => {
  const db = req.app.get('db');
  const { nome, telefone, email, senha, tipo } = req.body;

  try {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    const hashed = await bcrypt.hash(senha, 10);
    const id = uuidv4();

    await db.query(
      'INSERT INTO usuarios (id, nome, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?, ?)',
      [id, nome, telefoneLimpo, email || null, hashed, tipo]
    );

    if (!nome || !telefone || !senha || !tipo) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios' });
  }

    if (!['CLIENTE', 'PROFISSIONAL'].includes(tipo)) {
    return res.status(400).json({ mensagem: 'Tipo de usuário inválido' });
  }

    res.json({ ok: true, mensagem: 'Cadastro realizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
});

router.post('/login', async (req, res) => {
  const db = req.app.get('db');
  const { login, senha } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE telefone = ? OR email = ?',
      [login.replace(/\D/g, ''), login]
    );

    if (rows.length === 0) return res.status(401).json({ mensagem: 'Usuário não encontrado' });

    const usuario = rows[0];
    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) return res.status(401).json({ mensagem: 'Senha incorreta' });

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ ok: true, token, usuario: { nome: usuario.nome, tipo: usuario.tipo } });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
});

module.exports = router;