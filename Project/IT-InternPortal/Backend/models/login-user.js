const { DataTypes } = require('sequelize');
const sequelize = require('/');

const LoginUser = sequelize.define('login_user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  tableName: 'login_user',   // match your table name exactly
  freezeTableName: true,     // prevent pluralization
  timestamps: false          // don't expect createdAt/updatedAt
});

module.exports = LoginUser;
