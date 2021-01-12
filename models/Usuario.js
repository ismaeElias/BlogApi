const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize){
        super.init({
            nome : DataTypes.STRING,
            email: DataTypes.STRING,
            senha : DataTypes.STRING
        }, {
            sequelize,
            tableName : 'usuarios'
        })
    }
    static associate(models) {
        this.hasMany(models.Postagem , {foreignKey: 'usuario_id', as: 'postagem'});
    }
}

module.exports = Usuario;