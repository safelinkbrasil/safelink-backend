const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const JWT_SECRET = process.env.JWT_SECRET || 'segredoSafelink';

router.post('/register', async (req, res) => {
  const { email, senha } = req.body;

  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) return res.status(400).json({ mensagem: 'Usuário já existe' });

  const hash = await bcrypt.hash(senha, 10);
  const novo = new Usuario({ email, senha: hash });
  await novo.save();

  res.json({ mensagem: 'Usuário cadastrado com sucesso' });
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) return res.status(401).json({ mensagem: 'Usuário não encontrado' });

  const senhaOk = await bcrypt.compare(senha, usuario.senha);
  if (!senhaOk) return res.status(401).json({ mensagem: 'Senha inválida' });

  const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ sucesso: true, token });
});

module.exports = router;
