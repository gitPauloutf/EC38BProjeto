import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Context from "./context";
import { useState } from "react";

function App() {
  
  const [user, setUser] = useState({
    usr: "",
    name: "",
    isAdmin: "",
    isLogged: false,
  })
  
  return (
    <BrowserRouter>
      <Context.Provider value={[user, setUser]}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
