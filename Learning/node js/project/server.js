const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url'); // To parse URL and query parameters

// Create the server
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Routing for GET method
  if (req.method === 'GET') {
    if (parsedUrl.pathname === '/') {
      const filePath = path.join(__dirname, './form_remake.html');

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error reading the HTML file.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page not found');
    }
  } 
  else if (req.method === 'POST') {
    if (parsedUrl.pathname === '/submit') {
      let body = '';

      req.on('data', chunk => {
        body += chunk;
      });

      req.on('end', () => {
        console.log('Form Data:', body); 
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Form submitted successfully!');
      });

      req.on('error', err => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error processing form data.');
      });
    } else {
      // Handle other POST routes if needed
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page not found');
    }
  } 
  // Handling unsupported HTTP methods (PUT, DELETE, etc.)
  else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end(`Method ${req.method} Not Allowed`);
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
