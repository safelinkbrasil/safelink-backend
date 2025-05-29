const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

// Configuração do CORS para permitir o frontend do Vercel
const corsOptions = {
  origin: 'https://safelink-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Responder requisições OPTIONS (preflight) para todas as rotas
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB conectado');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
  });
})
.catch(err => {
  console.error('Erro ao conectar com o MongoDB:', err);
});
