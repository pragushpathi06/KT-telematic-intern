const fs = require('fs');

let arr;

fs.readFile('../javascript/sampleData.json', 'utf8', (err, data) => {
  if (err) throw err;
  arr=data
  console.log('File contents:', data);
});


fs.writeFile('output.txt', 'Hello World!', err => {
    if (err) throw err;
    console.log('File written successfully');
  });

  const writeStream = fs.createWriteStream('log.txt');

  writeStream.write('This is the first line.\n');
  writeStream.write('This is the second line.\n');
  writeStream.end();
  

//   fs.readdir (read contents of a directory)
  fs.mkdir('newFolder', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Directory created');
  });
  
//  ---fs.readdir (read contents of a directory)
  fs.readdir('.', (err, files) => {
    if (err) throw err;
    console.log('Files in current directory:', files);
  });
  