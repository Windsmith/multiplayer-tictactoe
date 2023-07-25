import React, { createContext } from 'react'


//TODO: This isn't persistent; look into cookies
export const AuthContext = createContext({
    token: "",
    setToken: () => { }
})