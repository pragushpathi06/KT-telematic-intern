const {DataTypes} = require('sequelize');
const sequelize =require('../config/database');

const UserProgress=sequelize.define('user_progress',{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the users table in database
      key: 'userid'   // Primary key column in users table
    }
  },
  studymaterialid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'study_material', // Name of the study_material table
      key: 'studymaterialid'   // Primary key column in study_material table
    }
  },
  status: {
      type: DataTypes.ENUM('not completed', 'on going', 'completed'),
    }
},{
    tableName:'user_progress',
    timestamps:false,
    indexes: [
    {
      unique: true,
      fields: ['user_id', 'studymaterialid']
    }
  ]
});





module.exports = UserProgress