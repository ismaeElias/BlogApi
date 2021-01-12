const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Postagem = require('../models/Postagem');

const connection = new Sequelize(dbconfig);

Usuario.init(connection);
Postagem.init(connection);

Usuario.associate(connection.models);
Postagem.associate(connection.models);

try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
} catch(error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = connection;