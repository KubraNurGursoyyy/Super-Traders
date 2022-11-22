'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shares.init({
    symbol: DataTypes.STRING,
    price: DataTypes.NUMERIC,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shares',
  });
  return shares;
};