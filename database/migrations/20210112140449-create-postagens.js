'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    const PostagemTabela = queryInterface.createTable('postagem',{
      id : {
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.INTEGER,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      titulo : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      conteudo : {
        allowNull : false,
        unique : true,
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

    return PostagemTabela;
  },

  down:  queryInterface => queryInterface.dropTable('postagem')
};
