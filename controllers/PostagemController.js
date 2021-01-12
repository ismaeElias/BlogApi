const Postagem = require('../models/Postagem');
const Usuario = require('../models/Usuario');

module.exports = {
    async index(req, res) {
        const postagem = await Postagem.findAll();

        return res.json(postagem);
    },
    async store(req, res){
        const { usuario_id } = req.params;
        const usuario = await Usuario.findByPk(usuario_id);
        
        const { titulo, conteudo } = req.body;

        if(!usuario){
            return res.status(400).json({Erro : 'Usuario não encontrado!'})
        }
            
        try { 
            const postagem = await Postagem.create({
                usuario_id,
                titulo,
                conteudo
            });
        return res.json(postagem);
       } catch (error) {
            return res.status(400).json({Erro:'Não foi possivel realizar o cadastro da postagem.' + error})
       }
    },
    async usuarioPostagem(req, res) {
        const { usuario_id } = req.params;
        const usuario = await Usuario.findByPk(usuario_id);

        if(!usuario){
            return res.status(400).json({Erro : 'Usuario não encontrado'});
        }

        const postagens = await Postagem.findAll({ 
            where : {
                usuario_id : usuario_id
            }
        });

        return res.status(200).json(postagens);
    }
}