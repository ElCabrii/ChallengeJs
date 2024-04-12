const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8080;

const index = fs.readFileSync(path.join(__dirname, '../../static/templates/index.html'));
const about = fs.readFileSync(path.join(__dirname, '../../static/templates/about.html'));
const notfound = fs.readFileSync(path.join(__dirname, '../../static/templates/notfound.html'));

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/templates");
    switch (req.url) {
        case "/":
            res.writeHead(200);
            res.end(index);
            break;
        case "/about":
            res.writeHead(200);
            res.end(about);
            break;
        default:
            res.writeHead(404);
            res.end(notfound);
    }
};

//create a server object:
const server = http.createServer((req, res) => {
    requestListener(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});