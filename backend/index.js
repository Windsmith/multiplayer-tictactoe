const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = new Server(server)

server.listen(3001, () => {
    console.log('Listening on 3001');
})

let connectedUsers = 0;

io.on('connection', (socket) => {
    connectedUsers++;
    console.log(connectedUsers);

    if (connectedUsers == 2) io.emit('match-found-status', true)

    socket.on('disconnect', () => {
        connectedUsers--;
        console.log(connectedUsers);

        if (connectedUsers == 1) io.emit('match-found-status', false)
    })

    socket.on('moveMade', (val) => {
        io.emit('board-update', val)
    })
})

