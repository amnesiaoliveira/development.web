const jwt = require('jsonwebtoken');
const JWT_SECRET = 'serviconecta2025-chave-super-secreta';

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
    console.log('Token inválido ou expirado:', err.message);
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};

module.exports = { verificarToken };