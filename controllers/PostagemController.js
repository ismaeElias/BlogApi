const PostagemModel = require('../models/PostagemModel');
const UsuarioModel = require('../models/UsuarioModel');

module.exports = {
    index : async (req, res) => {
        const postagem = await PostagemModel.lista();
        return res.json(postagem);
    },

    store : async (req, res) => {
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
    remove : async (req, res) => {
        const {usuario_id, id} = req.params;
        try {
            const usuario = await UsuarioModel.buscaPorId(usuario_id);
            
            if(!usuario){
                throw new Error('Usuário não encontrado!');
            }

            const postagem = await PostagemModel.buscaPostagem(usuario_id,id);

            if(!postagem){
                throw new Error('Postagem não encontrada!');
            }

            await PostagemModel.deletar(postagem);

            res.status(200).json({message : 'Postagem deletada!'});

        } catch (error) {
            res.status(404).json({erro : 'Não foi possivel remover a postagem: ' + error});
        }
        

    },
    usuarioPostagem : async (req, res) => {
        const { usuario_id } = req.params;
        const usuario = await UsuarioModel.buscaPorId(usuario_id);

        if(!usuario){
            return res.status(400).json({Erro : 'Usuario não encontrado'});
        }

        const postagens = await PostagemModel.listaPostagemUsuario(usuario_id);

        return res.status(200).json(postagens);
    }
}