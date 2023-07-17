import React, { createContext } from 'react'


//TODO: This isn't persistent
export const AuthContext = createContext({
    token: "",
    setToken: () => { }
})