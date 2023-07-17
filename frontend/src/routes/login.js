import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VStack, Text, Box, FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react";

import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { token, setToken } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {
        if (token === "") return
        navigate('/dashboard')
    }, [token])

    const login = async () => {
        const response = await fetch('/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        //TODO: add error handling when login doesn't return a token

        //TODO: add token saving to context and redirection
        let jsonResp = await response.json();
        setToken(jsonResp.token)
        //navigate('/dashboard')
    }

    return (
        <VStack w={'xs'} mx="auto" spacing={"5"} justify={'center'} h={'2xl'}>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <FormHelperText>Enter a strong password</FormHelperText>
            </FormControl>
            <Button colorScheme='blue' onClick={login}>Login</Button>
        </VStack>

    )
}