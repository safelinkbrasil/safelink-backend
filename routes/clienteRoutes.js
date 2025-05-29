const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const autenticarToken = require('../middleware/auth');

router.use(autenticarToken);

router.post('/', async (req, res) => {
  const novo = new Cliente(req.body);
  const salvo = await novo.save();
  res.json(salvo);
});

router.get('/', async (req, res) => {
  const lista = await Cliente.find();
  res.json(lista);
});

module.exports = router;
