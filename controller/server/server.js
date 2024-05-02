const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = 'localhost';

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.ico': 'image/x-icon',
    '.js': 'text/javascript',
};

const readFile = function (filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end(`Error loading file: ${err.message}`);
        } else {
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
};

const requestListener = function (req, res) {
    if (req.url.startsWith('/static/')) {
        // request is for a static file
        const filePath = `.${req.url}`;
        readFile(filePath, res);
    } else {
        // request is for a route
        switch (req.url) {
            case '/':
                readFile('./static/templates/index.html', res);
                break;
            case '/about':
                readFile('./static/templates/about.html', res);
                break;
            case '/chill':
                readFile('./static/templates/chill.html', res);
                break;
            case '/tryhard':
                readFile('./static/templates/tryhard.html', res);
                break;
            case '/reactiontime':
                readFile('./static/templates/reactionTime.html', res);
                break;
            case '/typingtest':
                readFile('./static/templates/typingTest.html', res);
                break;
            default:
                res.writeHead(404);
                res.end('Err 404 : Page Not Found');
        }
    }
};

http.createServer((req, res) => {
    requestListener(req, res);
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});