// Import the 'http' module
const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send the response
  res.end('Hello, World!');
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

