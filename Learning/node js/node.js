// Eventloop



console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise resolved");
});

console.log("4. End");




const fs1 = require('fs');

fs1.readFile('../javascript/sampleData.json', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log('Callback:', data);
});

const fs = require('fs').promises;

fs.readFile('../javascript/sampleData.json', 'utf8')
  .then(data => console.log('Promise:', data))
  .catch(err => console.error(err));



  async function readFileAsync() {
    try {
      const data = await fs.readFile('../javascript/sampleData.json', 'utf8');
      console.log('Async/Await:', data);
    } catch (err) {
      console.error(err);
    }
  }
  
  readFileAsync();
  

  const buffer = Buffer.from('Hello, Node.js');
console.log(buffer);            
console.log(buffer.toString());  






const http = require('http');


const server = http.createServer((req, res) => {
    if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
      }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});



const server1 = http.createServer((req, res) => {
    if (req.url === '/data' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'GET request successful' }));
    } else if (req.url === '/data' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk });
      req.on('end', () => {
        console.log('Received:', body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'POST received', data: body }));
      });
    } else {
      res.writeHead(404).end('Route not found');
    }
  });
  
