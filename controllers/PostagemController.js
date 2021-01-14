const PostagemModel = require('../models/PostagemModel');
const UsuarioModel = require('../models/UsuarioModel');

module.exports = {
    async index(req, res) {
        const postagem = await PostagemModel.lista();
        return res.json(postagem);
    },

    async store(req, res){
        const { usuario_id } = req.params;
        const { titulo, conteudo } = req.body;

        const usuario = UsuarioModel.buscaPorId(usuario_id);
        
        if(!usuario){
            return res.status(400).json({Erro : 'Usuario não encontrado!'})
        }

        try { 
            
            const postagem = new PostagemModel({
                usuario_id,
                titulo,
                conteudo
            })

            await postagem.adiciona();

            return res.json(postagem);
       } catch (error) {
            console.log(error);
       }
    },

    async usuarioPostagem(req, res) {
        const { usuario_id } = req.params;
        const usuario = await UsuarioModel.buscaPorId(usuario_id);

        if(!usuario){
            return res.status(400).json({Erro : 'Usuario não encontrado'});
        }

        const postagens = await PostagemModel.listaPostagemUsuario(usuario_id);

        return res.status(200).json(postagens);
    }
}