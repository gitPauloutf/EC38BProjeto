import Navbar from "../components/Navbar"
import { useContext, useEffect } from "react"
import Context from "../context";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"

const Home = () => {

    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLogged) {
            navigate("/dashboard")
        }
    }, [])

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-fill bg-body-tertiary">
                <div>
                    <h1 className="text-center">Projeto Web</h1>
                </div>
                <div>
                    <p className="text-md-center "> Bem vindo a pagina inicial do Projeto</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home