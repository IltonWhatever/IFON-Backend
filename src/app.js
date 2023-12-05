// Importa a biblioteca 'express-async-errors' para tratamento de erros assíncronos
require('express-async-errors');

// Importa as bibliotecas 'express', 'cors' e 'path'
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importa o arquivo de rotas definido em './routes'
const routes = require('./routes');

// Cria uma instância do aplicativo Express
const app = express();

// Configurações de middleware

// Habilita o CORS para permitir solicitações de diferentes origens
app.use(cors());

// Habilita o parsing de JSON no corpo da solicitação
app.use(express.json());

// Habilita o parsing de dados de formulário URL-encoded
app.use(express.urlencoded({ extended: true }));

// Define um middleware estático para servir arquivos estáticos (por exemplo, imagens)
app.use('/covers', express.static(path.resolve(__dirname, '..', 'public', 'uploads', 'covers')));
app.use(
  '/attachments',
  express.static(path.resolve(__dirname, '..', 'public', 'uploads', 'attachments'))
);

// Utiliza as rotas definidas no arquivo './routes'
app.use(routes);

// Middleware para tratamento de erros assíncronos
app.use((err, req, res, next) => {
  // Retorna um código de status 403 (Forbidden) e a mensagem de erro
  return res.status(403).json({ error: err.message });
});

// Exporta o objeto 'app' para uso em outros arquivos
module.exports = { app };
