const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StudyMaterial = sequelize.define('StudyMaterial', {  // Model name is 'StudyMaterial'
    studymaterialid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    youtube_link: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    tech:{
      type: DataTypes.STRING,
      allowNull: false, 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
}, {
  tableName: 'study_material',
  timestamps: false,
});

module.exports = StudyMaterial;
