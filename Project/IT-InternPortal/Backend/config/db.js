const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('intern-portal','postgres','pragush',{
    host:'localhost',
    dialect:'postgres',
    port:8706
}) 


module.exports = sequelize;