const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  endereco: String,
  documento: String,
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
