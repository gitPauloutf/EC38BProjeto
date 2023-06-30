import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tables from "../components/Table"
import { useContext, useEffect } from "react";
import Context from "../context";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.isLogged) {
            navigate("/")
        }
    }, [])

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-fill bg-body-tertiary">
                <div className='bg-secondary py-2 text-center' >
                    <h1 className='text-black'>Área do {user.isAdmin}</h1>
                </div>
                <div className='flex-fill'>        
                <div><Tables /></div>
                </div> 
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard