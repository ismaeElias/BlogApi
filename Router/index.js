const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');
const PostagemController = require('../controllers/PostagemController');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.store);

routes.get('/usuarios/postagem', PostagemController.index);
routes.post('/usuarios/:usuario_id/postagem', PostagemController.store);


module.exports = routes;