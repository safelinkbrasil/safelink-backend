const express = require('express');
const router = express.Router();
const Venda = require('../models/Venda');
const autenticarToken = require('../middleware/auth');

router.use(autenticarToken);

router.post('/', async (req, res) => {
  const nova = new Venda(req.body);
  const salva = await nova.save();
  res.json(salva);
});

router.get('/', async (req, res) => {
  const lista = await Venda.find();
  res.json(lista);
});

module.exports = router;
