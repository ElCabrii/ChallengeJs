const http = require('http');
const fs = require('fs');

const PORT = 8080;
const HOST = 'localhost'

const readFile = function (path, res) {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end(`Error loading template: ${err.message}`);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
}

const requestListener = function (req, res) {
    switch (req.url) {
        case '/':
            readFile('./static/templates/index.html', res);
            break;
        case '/about':
            readFile('./static/templates/about.html', res);
            break;
        default:
            res.writeHead(404);
            res.end('Err 404 : Page Not Found');
    }
}



http.createServer((req, res) => {
    requestListener(req, res);
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});