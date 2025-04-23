const User = require('./user');
const StudyMaterial = require('./studyMaterial');


User.hasMany(StudyMaterial, { foreignKey: 'user_id' });
StudyMaterial.belongsTo(User, { foreignKey: 'user_id' });


module.exports = { User, StudyMaterial };
