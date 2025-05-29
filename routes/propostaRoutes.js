const express = require('express');
const router = express.Router();
const Proposta = require('../models/Proposta');
const autenticarToken = require('../middleware/auth');

router.use(autenticarToken);

router.post('/', async (req, res) => {
  const nova = new Proposta(req.body);
  const salva = await nova.save();
  res.json(salva);
});

router.get('/', async (req, res) => {
  const lista = await Proposta.find();
  res.json(lista);
});

module.exports = router;
