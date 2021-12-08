'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tarefa.hasMany(models.SubTarefa);   
    }
  };
  Tarefa.init({
    titulo: DataTypes.STRING,
    prazo: DataTypes.DATE,
    descricao: DataTypes.STRING,
    status: DataTypes.STRING,
    dataFazer: DataTypes.DATE,
    tempoTotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarefa',
  });
  return Tarefa;
};