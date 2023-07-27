import { Link, Navigate } from 'react-router-dom';
import { VStack, Text, Button } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
    const { token, setToken, username, setUsername } = useContext(AuthContext)

    useEffect(() => {
        fetch('/user/me', { method: "GET" })
            .then((resp) => resp.json())
            .then((resp) => setUsername(resp.username))
    }, [])

    return (
        <>
            {token === "" ?
                <Navigate to={'/login'} />
                :
                <VStack>
                    <Text>
                        Welcome {username}, start game
                    </Text>

                    <Link to="/game"><Button colorScheme="blue">Start</Button></Link>
                </VStack>
            }
        </>

    );
}
