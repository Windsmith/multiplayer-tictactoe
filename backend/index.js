require('dotenv').config()

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")
const { randomUUID } = require('crypto')

const user = require("./routes/user")
const InitiateMongoServer = require("./config/db")
const User = require('./model/User')

InitiateMongoServer()

const app = express();
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000;

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
        let id;
        try {
            const decoded = jwt.verify(token, "randomString")
            id = decoded.user.id
        }
        catch {
            id = randomUUID()
        }


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
        socket.to(rooms.filter(room => room.id === roomId)[0].id).emit('turnStart', true)
        socket.to(rooms.filter(room => room.id === roomId)[0].id).emit('boardUpdate', boardState)
    })

    socket.on('setWinner', ({ winner, roomId }) => {
        //This event is triggered twice: by player and opponent. But we only want to emit the winner event once and filter the rooms once
        if (rooms.filter(room => room.id === roomId).length > 0) {
            let room = rooms.filter(room => room.id === roomId)[0]
            if (room.player1.username == winner) {
                User.findById(room.player1.id).then((doc) => {
                    doc.matchesWon += 1
                    doc.save()
                }).catch((err) => { console.log(err) })
            } else {
                User.findById(room.player2.id).then((doc) => {
                    doc.matchesWon += 1
                    doc.save()
                }).catch((err) => { console.log(err) })
            }
            io.to(room.id).emit('winner', winner)
            rooms = rooms.filter((room) => room.id != roomId)
        }

    })
})

