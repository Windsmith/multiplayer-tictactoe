import { useEffect, useState } from "react"
import { VStack, Text, Button, HStack } from '@chakra-ui/react';

export default function TicTacToe({ socket, isTurn, winner, player, opponent, setIsTurn, roomId, board, setBoard }) {
    const checkWin = () => {
        if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== ' ') return true
        if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== ' ') return true
        if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== ' ') return true

        if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== ' ') return true
        if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== ' ') return true
        if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== ' ') return true

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') return true
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') return true

        return false;
    }

    useEffect(() => {
        if (checkWin()) socket.emit('set-winner', player)
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
                winner ? <Text>{winner}</Text>
                    : null
            }
        </VStack>
    )
}