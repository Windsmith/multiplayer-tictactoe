import { useEffect, useState } from "react"

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
        <>
            <div>
                Current Player: {player}
            </div>
            <div>
                Opponent: {opponent}
            </div>
            <div>
                Current Turn: {isTurn ? "You" : "Opponent"}
            </div>

            <div className="flex flex-col border-2 border-black w-min m-20">
                {board.map((row, xindex) => {
                    return <div className="flex flex-row">
                        {row.map((elem, yindex) => {
                            return (
                                <div
                                    className="p-10 border-2 border-black"
                                    onClick={() => {
                                        let temp = [...board];
                                        if (temp[xindex][yindex] === ' ' && !winner && isTurn) {
                                            temp[xindex][yindex] = player;
                                            setBoard(temp);
                                            socket.emit('moveMade', temp)
                                            turnEnd()
                                        }
                                    }}
                                >
                                    {elem}
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>

            {
                winner ? <div>{winner}</div>
                    : null
            }
        </>
    )
}