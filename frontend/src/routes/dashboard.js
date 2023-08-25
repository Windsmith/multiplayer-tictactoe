import { Link, Navigate } from 'react-router-dom';
import { VStack, Text, Button } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
    const { token, setToken, username, setUsername } = useContext(AuthContext)
    const [isGuest, setIsGuest] = useState(false)
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (username == "") {
            fetch('/user/me', { method: "GET" })
                .then((resp) => resp.json())
                .then((resp) => setUsername(resp.username))
        }

        fetch('/user/matchScore', { method: "GET" })
            .then((resp) => resp.json())
            .then((resp) => setScore(resp.matchesWon))
    }, [])

    return (
        <>
            {username === "" ?
                <Navigate to={'/login'} />
                :
                <VStack>
                    <Text>
                        Welcome {username}, start game
                    </Text>

                    {token === "" ?
                        <Link to="/game"><Button colorScheme="blue">Login to track your wins</Button></Link>
                        : <Text>
                            Matches won: {score}
                        </Text>
                    }

                    <Link to="/game"><Button colorScheme="blue">Start</Button></Link>
                </VStack>
            }
        </>

    );
}
