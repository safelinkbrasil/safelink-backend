const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

// CORS: liberar acesso do Vercel
app.use(cors({
  origin: 'https://safelink-frontend.vercel.app', // <- MUITO IMPORTANTE
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());

// Uso das rotas
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB conectado com sucesso');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`)
  );
})
.catch((err) => {
  console.error('Erro ao conectar com MongoDB:', err);
});
