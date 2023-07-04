import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tables from "../components/Table"
import { useContext, useEffect } from "react";
import Context from "../context";
import { useNavigate } from "react-router-dom";
import {crud,getlogs} from '../service/Api'

const Dashboard = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.isLogged) {
            navigate("/")
        }
    }, [])

    const test = async () => {
        try{
        let install = await fetch('http://localhost:3001/install',{
            method: 'GET',
            credentials: 'include'})
        }catch (error){
            console.error(error)
            throw error;}
        console.log('foi')
        let resp = await crud({},'book','r',user.token)//list
        //create -> crud({book.ano, book.autor, book.name, book.editora},'book','c')
        //delete -> crud(book.name,'book','d')
        //update -> crud(book.name,'book,'u')
        //params 'book' ou 'author'
        
        /*listar quantidade de logins:
        let resp = await getlogs(user.usr)
        if (resp.timeslogged){
            console.log(resp.timeslogged)
        } else {
            console.log(resp.err)
        }*/
    }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-fill bg-body-tertiary">
                <div className='bg-secondary py-2 text-center' >
                    <h1 className='text-black'>Área do {user.isAdmin}</h1>
                </div>
                <div className="text-center">
                    <button type='button' className='btn btn-dark' onClick={() => test()}>Botao</button>
                </div>
                {(user.isAdmin=='Admin') && 
                <>
                <div className='flex-fill'>        
                <div><Tables /></div>
                </div>
                </>}
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard
