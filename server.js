const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

// CORS: permitir frontend da Vercel
app.use(cors({
  origin: 'https://safelink-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB conectado');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`)
  );
})
.catch(err => {
  console.error('Erro na conexão com MongoDB:', err);
});
