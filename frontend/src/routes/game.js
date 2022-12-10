import { useState, useEffect, useRef } from "react"
import io from 'socket.io-client'

import TicTacToe from "../components/TicTacToe";

export default function Game() {
    const [matchFound, setMatchFound] = useState(false);

    const socketRef = useRef()

    const [isConnected, setIsConnected] = useState(false)

    const [player, setPlayer] = useState('');
    const [winner, setWinner] = useState('');
    const [isTurn, setIsTurn] = useState(false)
    const [opponent, setOpponent] = useState('')

    useEffect(() => {
        const socket = io();

        socket.on('connect', () => {
            setIsConnected(true)
            socketRef.current = socket

            //TODO: Fix this when you implement Redux
            socket.emit('username', 'player')
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
        })

        socket.on('match-found-status', (val) => {
            console.log("bro");
            setMatchFound(val)
        })

        socket.on('set-player', (val) => {
            console.log('here', val);
            setPlayer(val)
        })

        socket.on('set-opponent', (val) => {
            console.log('here', val);
            setOpponent(val)
        })

        socket.on('turn-start', (val) => {
            setIsTurn(val)
            console.log('here', val);
        })

        socket.on('winner', (val) => setWinner(val))

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('match-found')
            socket.off('set-player')
            socket.off('set-opponent')
            socket.off('turn-start')
            socket.off('winner')
            socket.disconnect()
        }
    }, [])

    return (
        <>
            {
                matchFound
                    ?
                    <TicTacToe socket={socketRef.current} isTurn={isTurn} winner={winner} player={player} opponent={opponent} setIsTurn={setIsTurn} />
                    :
                    <div>Finding a match</div>

            }
        </>
    )
}