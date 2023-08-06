import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VStack, Text, Box, FormControl, FormLabel, Input, FormHelperText, Button, FormErrorMessage } from "@chakra-ui/react";

import { AuthContext } from "../contexts/AuthContext";
import { getRandomName } from "../utils/NameGenerator";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [generalError, setGeneralError] = useState(null);

    const { token, setToken, username, setUsername } = useContext(AuthContext)

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

        let jsonResp = await response.json()
        let respStatus = response.status

        if (respStatus === 400) {
            let message;
            if (!(typeof jsonResp.errors === 'undefined') && jsonResp.errors.length > 0) {
                //Only invalid email is possible
                message = jsonResp.errors[0].msg
            } else {
                message = jsonResp.message
            }
            setGeneralError(<Text>{message}</Text>)
        }
        else if (respStatus === 500) {
            const generalErrorMessage = <Text>The server has some issues. Please try again later.</Text>
            setGeneralError(generalErrorMessage)
        }
        else if (respStatus === 200) {
            setToken(jsonResp.token)
            navigate('/dashboard')
        }
    }

    const playAsGuest = () => {
        let randomName = getRandomName()
        setUsername(randomName)
        navigate('/dashboard')
    }

    return (
        <VStack w={'xs'} mx="auto" spacing={"5"} justify={'center'} h={'2xl'}>
            {generalError}
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

            <Button colorScheme='blue' onClick={playAsGuest}>Play as guest</Button>
        </VStack>
    )
}