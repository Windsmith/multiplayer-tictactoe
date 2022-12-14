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

let lobby = {}

io.on('connection', (socket) => {
    connectedUsers++;

    socket.on('disconnect', () => {
        connectedUsers--;

        if (connectedUsers == 1) io.emit('match-found-status', false)
    })

    socket.on('moveMade', (val) => {
        io.emit('board-update', val)
    })

    socket.on('turnEnd', (val) => {
        lobby[val].emit('turn-start', true)
    })

    socket.on('set-winner', (val) => { io.emit('winner', val) })

    socket.on('username', (val) => {
        lobby[`${val}${connectedUsers}`] = socket
        //TODO: Dunno where to put this exactly
        if (connectedUsers == 2) {
            io.emit('match-found-status', true)
            lobby['player1'].emit('set-player', 'X')
            lobby['player1'].emit('set-opponent', 'player2')
            lobby['player2'].emit('set-player', 'O')
            lobby['player2'].emit('set-opponent', 'player1')
            lobby['player1'].emit('turn-start', true)
        }
    })
})

