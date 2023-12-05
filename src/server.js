// Carrega as variáveis de ambiente do arquivo .env para process.env
require('dotenv').config();

// Importa o objeto 'app' do arquivo './app'
const { app } = require('./app');

// Importa a classe SequelizeDatabaseConnection do arquivo './database/connection'
const { SequelizeDatabaseConnection } = require('./database/connection');

// Importa o objeto 'logger' do arquivo './loaders/logger'
const { logger } = require('./loaders/logger');

//   Define a porta do servidor a partir da variável de ambiente APP_PORT ou usa 4000 como padrão
// A declaração da variavel se encontra tambem no arquivo .ENV
const SERVER_PORT = process.env.APP_PORT || 4000;

// Estabelece a conexão com o banco de dados usando o Sequelize
SequelizeDatabaseConnection.connect()
  .then(() => {
    // Inicia o servidor na porta especificada
    app.listen(SERVER_PORT, () => {
      // Registra uma mensagem de informação quando o servidor está em execução
      logger.info(`App Running on Port ${SERVER_PORT}`);
    });
  })
  .catch((error) => {
    // Em caso de erro, registra o stack trace do erro e encerra o processo
    logger.error(error.stack);
    process.exit(1);
  });
