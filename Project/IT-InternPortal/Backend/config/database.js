const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("intern-portal", "postgres", "pragush", {
    host : 'localhost',
    port:8706,
    dialect: 'postgres',
});

module.exports = sequelize;