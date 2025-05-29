const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
  produto: String,
  valor: Number,
  cliente: String,
  data: Date,
}, { timestamps: true });

module.exports = mongoose.model('Venda', vendaSchema);
