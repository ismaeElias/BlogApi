const express = require('express');


const UsuarioController = require('../controllers/UsuarioController');
const PostagemController = require('../controllers/PostagemController');
const auth = require('../middleware/auth');

const routes = express.Router();

routes.get('/usuarios',UsuarioController.index);
routes.get('/usuarios/:id',auth.bearer,UsuarioController.findOne);
routes.post('/usuarios', UsuarioController.store);
routes.delete('/usuarios/:id', auth.bearer ,UsuarioController.remove);

routes.get('/usuarios/postagem', PostagemController.index);
routes.post('/usuarios/:usuario_id/postagem', auth.bearer,PostagemController.store);
routes.get('/usuarios/:usuario_id/postagem', PostagemController.usuarioPostagem);
routes.delete('/usuarios/:usuario_id/postagem/:id',auth.bearer, PostagemController.remove);

routes.post('/login' ,auth.local, UsuarioController.login);
routes.post('/usuarios/logout', [auth.refresh, auth.bearer] ,UsuarioController.logout);
routes.post('/usuarios/atualiza_token',auth.refresh, UsuarioController.login);

module.exports = routes;