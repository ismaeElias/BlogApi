const passport = require('passport');
const Usuario = require('../models/UsuarioModel');
const alloListRefreshToken = require('../redis/allowlistRefreshToken');

async function verificaRefreshToken(refreshToken){
    if(!refreshToken){
        throw new Error('Refresh token não enviado!');
    }
    const id  = await alloListRefreshToken.buscaValor(refreshToken);
    if(!id) {
        throw new Error('Refresh token é invalido!');
    }
    return id;
}

async function invalidaRefreshToken(refreshToken) {
    await alloListRefreshToken.deleta(refreshToken);
}

module.exports = {
    local : (req, res, next) => {
        passport.authenticate(
            'local', 
            { session : false},
            (error, usuario, info) =>  {
                if(error){
                    return res.status(401).json({error : error.message})
                }
                if(!usuario){
                    return res.status(401).json();
                }
                
                req.user = usuario;
                return next();
            }
        )(req, res, next);
    },

    bearer : (req, res, next) => {
        passport.authenticate(
            'bearer',
            {session : false},
            (error, usuario , info) => {
                
                if(error && error.name === 'JsonWebTokenError') {
                    return res.status(401).json({error : error.message});
                }
                if(error && error.name === 'TokenExpiredError'){
                    return res.status(401).json({error : error.message, expiradoEm : error.expiredAt});
                }
                if(error){
                    return res.status(500).json({error : error.message});
                }

                if(!usuario){
                    return res.status(401).json();
                }

                req.token = info.token;
                req.user = usuario
                return next();
            }
        )(req, res, next);
    },

    refresh : async (req,res, next) => {
        try {
            const { refreshToken } = req.body;
            const id = await verificaRefreshToken(refreshToken);
            await invalidaRefreshToken(refreshToken);
            req.user = await Usuario.buscaPorId(id);
            return next();
        } catch (error) {
            return res.status(401).json({erro : error.message});
        }
        
    }
}