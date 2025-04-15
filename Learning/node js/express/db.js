const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ktt-learning',
  password: 'pragush',
  port: 8706,
});

pool.connect().then(() => console.log("connect"));

// pool.query('select * from tyre',(err,res) =>{
//     if(!err){
//         console.log(res.rows);
//     }
//     else{
//         console.log('err.message');
//     }
//     pool.end;
// })