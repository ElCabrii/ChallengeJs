const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

app.use('/', express.static(path.join(__dirname +'/public')))

app.get('/chillgames', (req, res) => {
    res.sendFile(__dirname + '/public/templates/chill.html')
})

app.get('/tryhardgames', (req, res) => {
    res.sendFile(__dirname + '/public/templates/tryhard.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/templates/about.html')
})

app.get('/tryhardgames/memorytest', (req, res) => {
    res.sendFile(__dirname + '/public/templates/memoryTest.html')
})

app.get('/tryhardgames/reactiontime', (req, res) => {
    res.sendFile(__dirname + '/public/templates/reactionTime.html')
})

app.get('/tryhardgames/typingtest', (req, res) => {
    res.sendFile(__dirname + '/public/templates/typingTest.html')
})
app.get('/chillgames/snake', (req, res) => {
    res.sendFile(__dirname + '/public/templates/snake.html')
})


app.use((req, res) => {
    res.status(404)
    res.sendFile(__dirname + '/public/templates/404.html')
})

app.listen(PORT, async () => {
    console.log('Server launched on http://localhost:' + PORT);
})