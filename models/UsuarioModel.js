const usuarioDao = require('./Usuario');
const bcrypt = require('bcrypt');

class Usuario {
    constructor(usuario){
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.senha = usuario.senha;
    }

    async adiciona(){
        return await usuarioDao.create(this);
    }

    async adicionaSenha(senha){
        this.senha = await Usuario.GerarSenhaHash(senha);
    }

    static GerarSenhaHash(senha){
        const custoHash = 12;
        return bcrypt.hash(senha,custoHash);
    }
}

module.exports = Usuario;