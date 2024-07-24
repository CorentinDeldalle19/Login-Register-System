'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.join(__dirname, '/../config/config.json'))[process.env.NODE_ENV || 'development'];
const db = {};

// Configure Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import the User model
const User = require('./user')(sequelize, Sequelize.DataTypes);
db.User = User;

// Execute associations if they are defined in the models
if (db.User.associate) {
  db.User.associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;