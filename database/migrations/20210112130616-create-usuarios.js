'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    const UsuarioTabela = queryInterface.createTable('usuarios', {
      id : {
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.INTEGER,
      },
      nome : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      email : {
        allowNull : false,
        unique : true,
        type : Sequelize.STRING,
      },
      senha : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    return UsuarioTabela;
  },

  down:  queryInterface => queryInterface.dropTable('Usuarios'),

};
