const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StudyMaterial = sequelize.define('login_user', {
    studyMaterialId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'users',  
        key: 'userid',   
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
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
    status: {
      type: DataTypes.ENUM('not completed', 'on going', 'completed'),
      defaultValue: 'not completed', 
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
