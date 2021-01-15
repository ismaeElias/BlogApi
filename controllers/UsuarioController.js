const UsuarioModel = require('../models/UsuarioModel');
const jwt = require('jsonwebtoken');
const blockList = require('../redis/BlockListAccessToken');
const crypto = require('crypto');
const moment = require('moment');
const allowListRefreshToken = require('../redis/allowlistRefreshToken');

function criaToken(usuario){
    const payload = {
        id : usuario.id
    };
    const token = jwt.sign(payload, process.env.CHAVE_SECRETA, {
        expiresIn : '15m'
    });

    return token;
}

async function criaTokenOpaco(usuario){
    const tokenOpaco = crypto.randomBytes(24).toString('hex');
    const dataExpiracao = moment().add(5,'d').unix();

    await allowListRefreshToken.adiciona(tokenOpaco, usuario.id, dataExpiracao);

    return tokenOpaco;
}

module.exports = {
     index : async (req, res) => {
        const usuarios = await UsuarioModel.lista();

        return res.json(usuarios);
    },

     store : async (req, res) => {
        const { nome, email, senha} = req.body;
        
        try {
            const usuario = new UsuarioModel({
                nome,
                email,
                senha
            });
            
            await usuario.adicionaSenha(senha);
            
            await usuario.adiciona();

            return res.status(201).json({Usuario : usuario});

        } catch (error) {
            return res.status(400).json({erro : error.message})
        }

    },

    login : async (req, res) => {
        try {
            const acessToken = criaToken(req.user);
            const refreshToken = await criaTokenOpaco(req.user);

            res.set('Authorization',acessToken);
            res.status(200).json({refreshToken});
        } catch (error) {
            res.status(500).json({ erro : error.message});
        }
    }, 

    logout : async (req, res) => {
        try {
            const token = req.token;
            await blockList.adiciona(token);
    
            res.status(204).send(); 
        } catch (error) {
            res.status(500).json({erro : error.message});
        }
    },

    remove : async (req, res) => {
        const {id} = req.params;
        try {
            await UsuarioModel.deleta(id);
            res.status(200).json({message : 'Usuário excluido'});
        } catch (error) {
            res.status(400).json({erro : 'Não foi possível excluir o usuário: ' + error})
        }
    }
}