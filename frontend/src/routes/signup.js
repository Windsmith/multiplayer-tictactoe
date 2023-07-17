import { useState } from "react";
import { Link } from "react-router-dom";
import { VStack, Text, Box, FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <VStack w={'xs'} mx="auto" spacing={"5"} justify={'center'} h={'2xl'}>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                <FormHelperText>Your display name</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormHelperText>We'll never share your email</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <FormHelperText>Enter a strong password</FormHelperText>
            </FormControl>
            <Button colorScheme='blue'>Signup</Button>
        </VStack>
    )
}