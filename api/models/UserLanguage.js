'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLanguages = sequelize.define('UserLanguages', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idLanguage: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {});
  return UserLanguages;
};