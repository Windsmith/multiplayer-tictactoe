import { useState, useEffect } from "react"

import TicTacToe from "../components/TicTacToe";

export default function Game() {
    const [matchFound, setMatchFound] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMatchFound(true)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {
                matchFound
                    ?
                    <TicTacToe />
                    :
                    <div>Finding a match</div>

            }
        </>
    )
}