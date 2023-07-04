import React, { createContext } from "react"



const Context = createContext([{
    name: "",
    usr: "",
    isAdmin: "",
    isLogged: false,
    token: ""
}, () => {}]);

export default Context;