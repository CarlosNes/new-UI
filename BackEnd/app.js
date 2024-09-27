const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config.js'); 
const { Sequelize } = require('sequelize');
const sneakerRoutes = require('./routes/index'); 

const app = express();

// Configuración de middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// Conectar a la base de datos
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sneakerRoutes(app); 

app.use(express.static('./public'));

app.get('*', (req, res) => res.status(200).send({
  message: 'Index.',
}));

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
