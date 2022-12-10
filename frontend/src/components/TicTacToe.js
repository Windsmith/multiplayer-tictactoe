import { useEffect, useState } from "react"

export default function TicTacToe({ socket }) {
    const [board, setBoard] = useState([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']])
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState('');

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
        socket.on('board-update', (val) => {
            setBoard(val)
        })

        return () => socket.off('board-update')
    })

    useEffect(() => {
        if (checkWin()) setWinner(player)
        console.log(board[0][0] === board[1][0])
    }, [board])

    return (
        <>
            <div>
                Current Player: {player}
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
                                        if (temp[xindex][yindex] === ' ' && !winner) {
                                            temp[xindex][yindex] = player;
                                            setBoard(temp);
                                            socket.emit('moveMade', temp)
                                            if (!checkWin()) player === 'X' ? setPlayer('O') : setPlayer('X')
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