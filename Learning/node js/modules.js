const fs = require('fs');


fs.readFile('/Learning/node js/output.tx', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});


fs.writeFile('/Learning/node js/output.txt', 'Hello from Node.js', (err) => {
  if (err) throw err;
  console.log('File written!');
});



const path = require('path');

const filePath = '/users/test/docs/file.txt';

console.log(path.basename(filePath)); 
console.log(path.dirname(filePath));  
console.log(path.extname(filePath));  
