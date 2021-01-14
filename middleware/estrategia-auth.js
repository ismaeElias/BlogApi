const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');

 function verificaUsuario(usuario){
    if(!usuario){
        throw new Error('Email/senha invalido ou não está cadastrado na base de dados!');
    }
}

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash);

    if(!senhaValida){
        throw new Error('Senha invalida!');
    }
}

passport.use( new LocalStrategy({
    usernameField : 'email',
    passwordField : 'senha',
    session : false
    },
    async (email , senha, done) => {
        try {
            const usuario = await Usuario.BuscarPorEmail(email);
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senha);
           
           done(null,usuario)
        } catch (error) {
           done(error);
        }
    } 
));