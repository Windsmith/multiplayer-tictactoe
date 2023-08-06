import { useState, useEffect, useRef, useContext } from 'react';
import { VStack, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import { AuthContext } from '../contexts/AuthContext';

import TicTacToe from '../components/TicTacToe';

export default function Game() {
    //TODO: Update AuthContext to contain all user session data like username
    const { token, setToken, username, setUsername } = useContext(AuthContext)

    const [matchFound, setMatchFound] = useState(false);
    const [roomId, setRoomId] = useState();

    const socketRef = useRef();

    const [board, setBoard] = useState([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']])
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
            //TODO: Change player name to the username after fixing authcontext
            socket.emit('playerConnects', { token, username });
        });

        socket.on('disconnect', () => {

        });

        socket.on('matchFound', ({ matchStatus, room }) => {
            setMatchFound(matchStatus);
            setRoomId(room)
        });

        socket.on('setPlayer', (val) => {
            setPlayer(val);
        });

        socket.on('setOpponent', (val) => {
            setOpponent(val);
        });

        socket.on('turnStart', (val) => {
            setIsTurn(val);
        });

        socket.on('boardUpdate', (val) => {
            setBoard(val)
        })

        socket.on('winner', (val) => setWinner(val));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('matchFound');
            socket.off('setPlayer');
            socket.off('setOpponent');
            socket.off('turnStart');
            socket.off('boardUpdate')
            socket.off('winner');
            socket.disconnect();
        };
    }, []);

    const Game = () => {
        return (
            <VStack>
                <Text>
                    You are: {player}
                </Text>
                <Text>
                    Opponent: {opponent}
                </Text>
                <Text>
                    Current Turn: {isTurn ? "You" : opponent}
                </Text>

                <VStack>
                    <TicTacToe socket={socketRef.current} isTurn={isTurn} winner={winner} player={player} opponent={opponent} setIsTurn={setIsTurn} roomId={roomId} board={board} setBoard={setBoard} username={username} />
                </VStack>

                {
                    winner ?
                        <>
                            <Text>{winner}</Text>
                            <Link to="/dashboard"><Button colorScheme="blue">Back</Button></Link>
                        </>
                        : <Button colorScheme="blue" onClick={() => socketRef.current.emit('setWinner', { winner: opponent, roomId })}>Forfeit</Button>

                }
            </VStack>
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
