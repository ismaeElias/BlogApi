const Usuario = require('../models/Usuario');
const UsuarioModel = require('../models/UsuarioModel');

module.exports = {
    async index(req, res) {
        const usuarios = await Usuario.findAll();

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

            return res.status(201).json();
            
        } catch (error) {
            console.log(error);
        }

        // const usuario = await Usuario.create({nome, email, senha});
        
        // return res.json(usuario);
    }
}