import { useEffect, useState } from "react"
import { VStack, Text, Button, HStack } from '@chakra-ui/react';

export default function TicTacToe({ socket, isTurn, winner, player, opponent, setIsTurn }) {
    const [board, setBoard] = useState([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']])

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

    console.log(player, opponent, isTurn);
    useEffect(() => {
        socket.on('board-update', (val) => {
            console.log(val)
            setBoard(val)
        })

        return () => {
            socket.off('board-update')
        }
    })

    useEffect(() => {
        if (checkWin()) socket.emit('set-winner', player)
    }, [board])

    const turnEnd = () => {
        socket.emit('turnEnd', opponent)
        setIsTurn(false)
    }

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
                    return <HStack>
                        {row.map((elem, yindex) => {
                            console.log(elem)
                            return (
                                <Button
                                    onClick={() => {
                                        let temp = [...board];
                                        if (temp[xindex][yindex] === ' ' && !winner && isTurn) {
                                            temp[xindex][yindex] = player;
                                            setBoard(temp);
                                            //socket.emit('moveMade', temp)
                                            //turnEnd()
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