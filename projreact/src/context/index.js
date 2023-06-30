import React, { createContext } from "react"

const Context = createContext([{
    name: "",
    usr: "",
    isAdmin: "",
    isLogged: false
}, () => {}]);

export default Context;