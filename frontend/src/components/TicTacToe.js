import { useEffect, useState } from "react"
import { VStack, Text, Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function TicTacToe({ socket, isTurn, winner, player, opponent, setIsTurn, roomId, board, setBoard }) {
    const checkWin = () => {
        if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== ' ') return board[0][0]
        if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== ' ') return board[0][1]
        if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== ' ') return board[0][2]

        if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== ' ') return board[0][0]
        if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== ' ') return board[1][0]
        if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== ' ') return board[2][0]

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') return board[0][0]
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') return board[0][2]

        return false;
    }

    useEffect(() => {
        let winner = checkWin();
        if (winner != false) socket.emit('setWinner', { winner: winner, roomId })
    }, [board])

    return (
        <VStack>
            <Text>
                Current Player: {player}
            </Text>
            <Text>
                Opponent: {opponent}
            </Text>
            <Text>
                Current Turn: {isTurn ? "You" : "Opponent"}
            </Text>

            <VStack>
                {board.map((row, xindex) => {
                    return <HStack key={xindex}>
                        {row.map((elem, yindex) => {
                            return (
                                <Button
                                    key={xindex + yindex}
                                    onClick={() => {
                                        let temp = [...board];
                                        if (temp[xindex][yindex] === ' ' && !winner && isTurn) {
                                            temp[xindex][yindex] = player;
                                            console.log(temp)
                                            setBoard(temp);
                                            socket.emit('moveMade', { boardState: [...temp], roomId })
                                            setIsTurn(false)
                                        }
                                    }}
                                >
                                    {elem}
                                </Button>
                            )
                        })}
                    </HStack>
                })}
            </VStack>

            {
                winner ?
                    <>
                        <Text>{winner}</Text>
                        <Link to="/dashboard"><Button colorScheme="blue">Back</Button></Link>
                    </>
                    : null
            }
        </VStack>
    )
}