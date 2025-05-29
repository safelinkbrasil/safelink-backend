const mongoose = require('mongoose');

const propostaSchema = new mongoose.Schema({
  servico: String,
  valor: Number,
  cliente: String,
}, { timestamps: true });

module.exports = mongoose.model('Proposta', propostaSchema);
