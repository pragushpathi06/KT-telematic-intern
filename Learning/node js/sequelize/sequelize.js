const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: 'postgres',
  password: 'pragush',
  database: 'ktt-learning',
  host: 'localhost',
  port: 8706,
  dialect: 'postgres',
});

module.exports = sequelize;
