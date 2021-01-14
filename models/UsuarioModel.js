const usuarioDao = require('./Usuario');
const bcrypt = require('bcrypt');
const ErrorUsuario = require('../utils/Validations/Usuario');

class Usuario {
    constructor(usuario){
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.senha = usuario.senha;
    }

    async adiciona(){
        const emailValido = await this.verificaEmail(this.email);
        
        if(emailValido){
            throw new ErrorUsuario();
        }

        return await usuarioDao.create(this);
    }

    async adicionaSenha(senha){
        this.senha = await Usuario.GerarSenhaHash(senha);
    }

    async verificaEmail(email){
        const emailEncontrado = await usuarioDao.findOne({
            where : {
                email : email
            }
        })

        return emailEncontrado;
    }
    
    static GerarSenhaHash(senha){
        const custoHash = 12;
        return bcrypt.hash(senha,custoHash);
    }

    static async BuscarPorEmail(email){
        const usuario = await usuarioDao.findOne({
            where : {
                email : email
            }
        });

        if(!usuario){
            return null;
        }

        return new Usuario(usuario);
    }

    static lista(){
       const usuarios =  usuarioDao.findAll();

       return usuarios;
    }

    static async buscaPorId(id){
        const usuario = usuarioDao.findOne({
            where : {
                id : id
            }
        });

        return usuario;
    }
}

module.exports = Usuario;