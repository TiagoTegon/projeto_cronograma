'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubTarefa.belongsTo(models.Tarefa);
    }
  };
  SubTarefa.init({
    titulo: DataTypes.STRING,
    duracao: DataTypes.INTEGER,
    status: DataTypes.STRING,
    tarefaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubTarefa',
  });
  return SubTarefa;
};