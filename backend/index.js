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

    socket.on('playerConnects', (token) => {
        const decoded = jwt.verify(token, "randomString")
        const id = decoded.user.id
        lobby.push({ id, socket })

        //If 2 players, connect them together in a game-room
        if (lobby.length % 2 == 0) {
            //put 2 players in a room
            let room = { id: rooms.length }
            room['player1'] = lobby.pop()
            room['player2'] = lobby.pop()
            room.player1.socket.join(room.id)
            room.player2.socket.join(room.id)
            rooms.push(room)

            //set both players match status as true
            io.to(room.id).emit('matchFound', true)
        }
    })
    /*
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
        */
})

