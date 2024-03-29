const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Set default file to serve as index.html if the URL is '/'
    if (filePath === './') {
        filePath = './html_pages/index.html';
    } else {
        // Normalize file path to resolve relative paths
        filePath = path.normalize(filePath);

        // Define directories for static files
        const staticDirs = ['styles', 'images', 'scripts'];

        // Check if requested file is in a static directory
        const isInStaticDir = staticDirs.some(dir => filePath.startsWith(path.normalize(`./${dir}`)));

        if (!isInStaticDir) {
            // Append '/html_pages' to the file path if it doesn't already start with it
            if (!filePath.startsWith(path.normalize('./html_pages'))) {
                filePath = path.join(__dirname, 'html_pages', filePath);
            }
        }
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // Determine content type based on file extension
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpeg':
        case '.jpg':
            contentType = 'image/jpeg';
            break;
    }

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
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 
