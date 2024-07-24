'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      Language.belongsTo(models.Admin, { foreignKey: 'idAdmin' });
      Language.hasMany(models.Notion, { foreignKey: 'idLanguage' });
      Language.belongsToMany(models.User, { through: 'UserLanguages', as: 'Users', foreignKey: 'idLanguage' });
    }
  }
  Language.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkDoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idAdmin: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Admins',
        key: 'idAdmin',
      },
    },
  }, {
    sequelize,
    modelName: 'Language',
  });
  return Language;
};