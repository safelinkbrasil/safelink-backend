const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'segredoSafelink';

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ mensagem: 'Token ausente' });

  jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido' });
    req.user = user;
    next();
  });
}

module.exports = autenticarToken;
