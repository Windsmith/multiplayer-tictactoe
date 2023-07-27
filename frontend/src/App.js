import React, { useContext, useState } from 'react';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import Home from './routes/home';
import ErrorPage from './error-page';
import Login from './routes/login';
import Signup from './routes/signup';
import Game from './routes/game';
import Dashboard from './routes/dashboard';

import { AuthContext } from './contexts/AuthContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/game',
        element: <Game />,
    },
]);

export default function App() {
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const value = { token, setToken, username, setUsername }

    return (
        <ChakraProvider>
            <AuthContext.Provider value={value}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        </ChakraProvider>
    )
}