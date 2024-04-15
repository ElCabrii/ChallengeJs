// Contenu de serveur.js
const http = require('http');
const fs = require('fs');
const url = require('url');

// Importer les fonctions depuis les fichiers JS
const Game = require('./Game');
const Player = require('./Player');
const Ball = require('./Ball');

// Créer le serveur HTTP
http.createServer((req, res) => {
    // Analyser l'URL
    const path = url.parse(req.url).pathname;

    // Gérer les requêtes selon le chemin de l'URL
    switch(path) {
        case '/start':
            Game.startGame();
            break;
        case '/createPlayer':
            Player.createPlayer();
            break;
        case '/createBall':
            Ball.createBall();
            break;
        default:
            res.writeHead(404);
            res.write("Page not found");
            res.end();
            break;
    }
}).listen(8080);

console.log('Serveur démarré sur le port 8080');
