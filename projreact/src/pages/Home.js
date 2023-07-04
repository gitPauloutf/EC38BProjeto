import Navbar from "../components/Navbar"
import { useContext, useEffect } from "react"
import Context from "../context";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import {crud} from '../service/Api'

const Home = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();

    const test = async () => {
        console.log('foi')
        await crud({},'book','r')//list
        //create -> crud({book},'book','c')
        //delete -> crud(book.name,'book','d')
        //update -> crud(book.name,'book,'u')
    }

    /*const fetchdata = async () => {
        const res = await fetch('http://localhost:3001/',{credentials: 'include'})
        var resj = await res.json()
        if (resj.usr){
            setUser({
                usr: resj.usr,
                name: resj.name,
                isAdmin: resj.isAdmin,
                isLogged: true,
            })
            navigate("/dashboard")
        }
    }
    useEffect(() => {
        fetchdata().catch(console.error);
      }, [])*/
    
    useEffect(() => {
        if (user.isLogged==true) {
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
                    <button type='button' className='btn' onClick={() => test()}>butao</button>
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