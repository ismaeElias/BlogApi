const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsuarioDao = require('../models/Usuario');

passport.use( new LocalStrategy({
    usernameField : 'email',
    passwordField : 'senha',
    session : false
    },
    async (email , senha, done) => {
       try {
           const usuario = await UsuarioDao.findOne({
               where : {
                   email : email,
                   senha : senha
               }
           });
           done(null,usuario)
       } catch (error) {
           done(error);
       }
    } 
));