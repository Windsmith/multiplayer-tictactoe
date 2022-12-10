import { useState, useEffect, useRef } from "react"
import io from 'socket.io-client'

import TicTacToe from "../components/TicTacToe";

export default function Game() {
    const [matchFound, setMatchFound] = useState(false);

    const socketRef = useRef()

    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socket = io();

        socket.on('connect', () => {
            setIsConnected(true)
            socketRef.current = socket
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
        })

        socket.on('match-found-status', (val) => {
            setMatchFound(val)
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('match-found')
            socket.disconnect()
        }
    }, [])

    return (
        <>
            {
                matchFound
                    ?
                    <TicTacToe socket={socketRef.current} />
                    :
                    <div>Finding a match</div>

            }
        </>
    )
}