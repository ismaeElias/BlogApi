class UsuarioEncontrado extends Error {
    constructor(){
        super('Usuário já cadastrado no sistema');
        this.name = 'UsuarioEncontrado'
    }
}


module.exports = UsuarioEncontrado;