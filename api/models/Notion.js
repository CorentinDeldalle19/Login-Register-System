'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notion extends Model {
    static associate(models) {
      Notion.belongsTo(models.Language, { foreignKey: 'idLanguage' });
    }
  }
  Notion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idLanguage: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Languages',
        key: 'id',
      },
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    linkVideo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkCodepen: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Notion',
  });
  return Notion;
};