const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const port = 3001;

app.use(cors());

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })

app.listen(port, () => {
    console.log('Ejemplo servidor corriendo en JS y Node', port)
})