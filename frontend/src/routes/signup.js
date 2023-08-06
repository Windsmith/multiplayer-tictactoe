import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VStack, Text, Box, FormControl, FormLabel, Input, FormHelperText, Button, FormErrorMessage } from "@chakra-ui/react";

import { AuthContext } from "../contexts/AuthContext";
import { getRandomName } from "../utils/NameGenerator"

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [generalError, setGeneralError] = useState(null);

    const authObj = useContext(AuthContext)
    const token = authObj.token;
    const setToken = authObj.setToken

    const navigate = useNavigate();

    useEffect(() => {
        if (token === "") return
        navigate('/dashboard')
    }, [token])


    const resetErrors = () => {
        setUsernameError(false)
        setEmailError(false)
        setPasswordError(false)
    }

    const signup = async () => {
        const response = await fetch('/user/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        let jsonResp = await response.json();
        let respStatus = response.status

        resetErrors()

        if (respStatus === 400) {
            let message;
            if (!(typeof jsonResp.errors === 'undefined') && jsonResp.errors.length > 0) {
                for (let i = 0; i < jsonResp.errors.length; i++) {
                    if (jsonResp.errors[i].path === "email") setEmailError(true)
                    else if (jsonResp.errors[i].path === "username") setUsernameError(true)
                    else if (jsonResp.errors[i].path === "password") setPasswordError(true)
                }
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
        authObj.setUsername(randomName)
        navigate('/dashboard')
    }

    return (
        <VStack w={'xs'} mx="auto" spacing={"5"} justify={'center'} h={'2xl'}>
            {generalError}
            <FormControl isInvalid={usernameError}>
                <FormLabel>Username</FormLabel>
                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                <FormHelperText>Your display name</FormHelperText>
                <FormErrorMessage>Enter a valid username</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={emailError}>
                <FormLabel>Email address</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormHelperText>We'll never share your email</FormHelperText>
                <FormErrorMessage>Enter a valid email</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={passwordError}>
                <FormLabel>Password</FormLabel>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <FormHelperText>Enter a strong password</FormHelperText>
                <FormErrorMessage>Enter a valid password. Password should be longer than 6 characters</FormErrorMessage>
            </FormControl>
            <Button colorScheme='blue' onClick={signup}>Signup</Button>

            <Button colorScheme='blue' onClick={playAsGuest}>Play as guest</Button>
        </VStack>
    )
}