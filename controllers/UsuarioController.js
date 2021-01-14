const UsuarioModel = require('../models/UsuarioModel');
const jwt = require('jsonwebtoken');

function criaToken(usuario){
    const payload = {
        id : usuario.id
    };

    const token = jwt.sign(payload, 'teste', {
        expiresIn : '15m'
    });

    return token;
}

module.exports = {
    async index(req, res) {
        const usuarios = await UsuarioModel.lista();

        return res.json(usuarios);
    },

    async store(req, res) {
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
    login: (req, res) => {
        const token = criaToken(req.user);
        res.set('Authorization',token);
        res.status(204).send();
    }
}