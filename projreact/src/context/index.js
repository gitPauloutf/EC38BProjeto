import React, { createContext } from "react"

const Context = createContext([{
    name: "",
    usr: "",
    isAdmin: false,
    isLogged: false
}, () => {}]);

export default Context;