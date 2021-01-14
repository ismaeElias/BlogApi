const postagemDao = require('./Postagem');

class Postagem{
    constructor(postagem){
        this.titulo = postagem.titulo;
        this.conteudo = postagem.conteudo;
        this.usuario_id = postagem.usuario_id;
    }

    async adiciona(){
        return  await postagemDao.create(this);;
    }

    static lista(){
        const postagens = postagemDao.findAll();

        return postagens;
    }

   static listaPostagemUsuario(id){
       const postagens = postagemDao.findAll({
           where : {
               usuario_id : id
           }
       });
       return postagens
   }
}

module.exports = Postagem;