const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoginUser = sequelize.define('login_user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  tableName: 'login_user',
  timestamps: false,
});

module.exports = LoginUser;
