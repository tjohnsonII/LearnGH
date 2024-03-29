const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Use the username obtained from the database
  host: 'localhost', // Use the hostname obtained from the database
  database: 'users', // Use the database name obtained from the database
  port: 5432, // Use the port obtained from the database
});

const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Set default file to serve as index.html if the URL is '/'
  if (pathname === '/') {
    pathname = '/html_pages/index.html';
  }

  let filePath = `.${pathname}`;

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      let contentType = 'text/html';
      const extname = path.extname(filePath);
      if (extname === '.css') {
        contentType = 'text/css';
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Testing database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('Connected to PostgreSQL database');
    console.log('Current date and time from the database:', res.rows[0].now);
  }
});
