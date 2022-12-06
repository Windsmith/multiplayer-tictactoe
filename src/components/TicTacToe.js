import { useState } from "react"

export default function TicTacToe() {
    const [board, setBoard] = useState([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']])
    const [player, setPlayer] = useState('X');

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
                                        temp[xindex][yindex] = player;
                                        setBoard(temp);
                                        player === 'X' ? setPlayer('O') : setPlayer('X')
                                    }}
                                >
                                    {elem}
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>
        </>
    )
}