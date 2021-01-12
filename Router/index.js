const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');
const PostagemController = require('../controllers/PostagemController');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.store);

routes.get('/postagem', PostagemController.index);

module.exports = routes;