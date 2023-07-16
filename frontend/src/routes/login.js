import { useState } from "react";
import { Link } from "react-router-dom";
import { VStack, Text, Box, FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <VStack>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' />
                <FormHelperText>Enter a strong password</FormHelperText>
            </FormControl>
            <Button colorScheme='blue'>Login</Button>
        </VStack>

    )
}