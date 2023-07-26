import { useState, useEffect, useRef, useContext } from 'react';
import { VStack, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import { AuthContext } from '../contexts/AuthContext';

import TicTacToe from '../components/TicTacToe';

export default function Game() {
    //TODO: Update AuthContext to contain all user session data like username
    const { token, setToken } = useContext(AuthContext)

    const [matchFound, setMatchFound] = useState(false);

    const socketRef = useRef();

    //const [isConnected, setIsConnected] = useState(false);

    const [player, setPlayer] = useState('');
    const [winner, setWinner] = useState('');
    const [isTurn, setIsTurn] = useState(false);
    const [opponent, setOpponent] = useState('');

    useEffect(() => {
        const socket = io();

        socket.on('connect', () => {
            //setIsConnected(true);
            socketRef.current = socket;

            //Send token to server where it can log user id and keep track of player.
            socket.emit('playerConnects', token);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('matchFound', (val) => {
            setMatchFound(val);
        });

        socket.on('set-player', (val) => {
            setPlayer(val);
        });

        socket.on('set-opponent', (val) => {
            setOpponent(val);
        });

        socket.on('turn-start', (val) => {
            setIsTurn(val);
        });

        socket.on('winner', (val) => setWinner(val));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('matchFound');
            socket.off('playerConnects');
            socket.off('set-opponent');
            socket.off('turn-start');
            socket.off('winner');
            socket.disconnect();
        };
    }, []);

    const Game = () => {
        return (
            <>
                <VStack>
                    <TicTacToe socket={socketRef.current} isTurn={isTurn} winner={winner} player={player} opponent={opponent} setIsTurn={setIsTurn} />
                </VStack>
            </>
        )
    }

    const Waiting = () => {
        return (
            <>
                <VStack>
                    <Text>Finding a match</Text>
                    <Link to="/dashboard"><Button colorScheme="blue">Stop</Button></Link>
                </VStack>
            </>
        )
    }

    return (
        <>
            {
                matchFound
                    ? <Game />
                    : <Waiting />
            }
        </>
    );
}
