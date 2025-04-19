const pg = require('pg');
const {Pool , Client} = pg;
const db = new Client({
    user:'postgres',
    host:'localhost',
    database:'intern-portal',
    password:'pragush',
    port:8706
})

module.exports = db;