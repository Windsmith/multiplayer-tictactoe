import { Link } from 'react-router-dom';
import { VStack, Text, Button } from '@chakra-ui/react';
import React from 'react';

export default function Home() {
  return (
    <VStack direction="column">
      <Text>
        Tic Tac Toe Battlegrounds
      </Text>

      <Link to="/login"><Button colorScheme="blue">Start</Button></Link>
    </VStack>
  );
}
