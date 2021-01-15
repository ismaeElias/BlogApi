const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/UsuarioModel');
const blockList = require('../redis/BlockListAccessToken');

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

async function verificaTokenBlacklist(token) {
    const tokenNaBlackListawait = await blockList.contemToken(token);
    if(tokenNaBlackListawait){
        throw new jwt.JsonWebTokenError('Token invalido por logout');
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

passport.use( new BearerStrategy(
    async (token,done) => {
        try {
            await verificaTokenBlacklist(token);
            const payload = jwt.verify(token,process.env.CHAVE_SECRETA);
            const usuario = await Usuario.buscaPorId(payload.id);

            done(null, usuario, {token : token});
        } catch (error) {
            done(error);
        }
    }
));

