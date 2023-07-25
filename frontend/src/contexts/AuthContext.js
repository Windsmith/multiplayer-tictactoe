import React, { createContext } from 'react'

let cookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

export const AuthContext = createContext({
    token: cookie || "",
    setToken: () => { }
})