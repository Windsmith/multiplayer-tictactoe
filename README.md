# Multiplayer TicTacToe

This webapp allows people to play tictactoe with each other from anywhere in the world.

## Status

I'm done working on this app.

While the webapp itself isn't 100% complete, I have accomplished all my goals, learnt a ton of stuff, and had a ton of fun! 

### What's incomplete?

- The auth is slightly broken. The session is reset when the browser is refreshed. 
- The UI could be improved. Its very basic.
- It hasn't been deployed and tested in a production environment. 

## Goals
I'm building this application to learn: 

- **how to implement a backend server that can handle a multiplayer game**: This is what excited me about this project. Implementing a server that receives data from 1 client, updates it on another client in real time and vice versa; for multiple pairs sounded technically challenging and quite fun to try and implement. ✅
- **how to work with websockets**: Real time multiplayer cannot be implemented with regular http requests. Websockets can solve the problem. So I'm gonna learn to work with websockets. The library I plan on using is [socket.io](https://socket.io). ✅
- **the basics of backend**: I'm gonna learn how to implement authentication, session management, and database connectivity with MongoDB  ✅

## Extra stuff that I learnt

- **How to work with docker and docker compose**: The project consists of two parts: the frontend and the backend. Both of them were turned into docker images and the entire application has a docker compose file to set it all up. 

- **About cookies and jwts**: When I was looking into implementing session management, I learnt about cookies, jwts, client side and server side session management. 

- **The convenience of firebase and supabase**: After I was done implementing authentication and session management. I had learnt a ton and had written quite a bit of code. I was curious about firebase and supabase and how their auth compares. I was mindblown by how simple it is to use them. Definitely gonna try working with them later. 