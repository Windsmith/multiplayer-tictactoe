require('dotenv').config()

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")

const user = require("./routes/user")
const InitiateMongoServer = require("./config/db")

InitiateMongoServer()

const app = express();
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json())
app.use(cookieParser())

// Router middleware
app.use("/user", user);

server.listen(PORT, () => {
    console.log('Listening on 3001');
})

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

let connectedUsers = 0;

let lobby = []

let rooms = []

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        lobby = lobby.filter(user => user.socket.id != socket.id)
    })

    socket.on('playerConnects', ({ token, username }) => {
        const decoded = jwt.verify(token, "randomString")
        const id = decoded.user.id
        lobby.push({ id, username, socket })

        //If 2 players, connect them together in a game-room
        if (lobby.length % 2 == 0) {
            //put 2 players in a room
            let room = { id: rooms.length }
            room['player1'] = lobby.pop()
            room['player2'] = lobby.pop()
            room.player1.socket.join(room.id)
            room.player2.socket.join(room.id)
            rooms.push(room)

            let player1 = room.player1;
            let player2 = room.player2;

            //set both players required states to their appropriate values
            io.to(room.id).emit('matchFound', { matchStatus: true, room: room.id })
            player1.socket.emit('setPlayer', 'X')
            player1.socket.emit('setOpponent', player2.username)
            player2.socket.emit('setPlayer', 'O')
            player2.socket.emit('setOpponent', player1.username)
            player1.socket.emit('turnStart', true)
        }
    })

    socket.on('moveMade', ({ boardState, roomId }) => {
        socket.to(rooms.filter(room => room.id === roomId)[0].id).emit('boardUpdate', boardState)
        socket.to(rooms.filter(room => room.id === roomId)[0].id).emit('turnStart', true)
    })
    /*
        
    
        socket.on('turnEnd', (val) => {
            lobby[val].emit('turn-start', true)
        })
    
        socket.on('set-winner', (val) => { io.emit('winner', val) })
        */
})

