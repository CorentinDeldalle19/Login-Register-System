'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.belongsTo(models.User, { foreignKey: 'idUser' });
      Admin.hasMany(models.Language, { foreignKey: 'idAdmin' });
    }
  }
  Admin.init({
    idAdmin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'idUser',
      },
    },
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};