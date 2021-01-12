const {Model, DataTypes} = require('sequelize');

class Postagem extends Model{
    static init(sequelize) {
        super.init({
            titulo : DataTypes.STRING,
            conteudo : DataTypes.STRING,
        },{
            sequelize,
            tableName : 'postagem'
        })
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'usuario_id', as : 'usuarios'})
    }
}


module.exports = Postagem;