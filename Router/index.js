const express = require('express');
const passport = require('passport');

const UsuarioController = require('../controllers/UsuarioController');
const PostagemController = require('../controllers/PostagemController');
const auth = require('../middleware/auth');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.store);
routes.delete('/usuarios/:id',passport.authenticate('bearer', {session : false}),UsuarioController.remove);

routes.get('/usuarios/postagem', PostagemController.index);
routes.post('/usuarios/:usuario_id/postagem', passport.authenticate('bearer', {session : false}),PostagemController.store);
routes.get('/usuarios/:usuario_id/postagem', PostagemController.usuarioPostagem);
routes.delete('/usuarios/:usuario_id/postagem/:id',passport.authenticate('bearer', {session : false}), PostagemController.remove);

routes.post('/login',auth.local, UsuarioController.login);

module.exports = routes;