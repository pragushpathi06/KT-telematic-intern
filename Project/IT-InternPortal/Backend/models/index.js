const User = require('./user');
const StudyMaterial = require('./studyMaterial');
const UserProgress = require('./userProgress');

// Setting up relationships
// User.hasMany(StudyMaterial, { foreignKey: 'user_id' });
// StudyMaterial.belongsTo(User, { foreignKey: 'user_id' });


UserProgress.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'userid'
  });
  
  UserProgress.belongsTo(StudyMaterial, {
    foreignKey: 'studymaterialid',
    targetKey: 'studymaterialid'
  });

  User.hasMany(UserProgress, {
    foreignKey: 'user_id'
  });
  
  StudyMaterial.hasMany(UserProgress, {
    foreignKey: 'studymaterialid'
  });
  
  

module.exports = { User, StudyMaterial,UserProgress};
