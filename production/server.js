const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Parse the URL to extract the file path
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  console.log('File Path:', filePath); // Debug output

  // Check if the requested file exists
  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    // Read the file and serve it
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      // Set the appropriate Content-Type header based on the file extension
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
      }[path.extname(filePath)];

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
 
