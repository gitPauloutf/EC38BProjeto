import LoginModal from "../LoginModal"
import RegisterModal from "../RegisterModal"
import { useContext, useEffect } from "react"
import Context from "../../context"
import { useNavigate } from "react-router-dom";
import EditModal from "../EditModal"

const Navbar = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate()

    const Logout = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/out',{credentials: 'include'})
        var resj = await res.json()
        if (resj.status==true) {
            navigate('/')
            console.log(resj.status)
            setUser('')}
    }

    return (
        <>
            <nav className="navbar bg-dark">
                <form className="container-fluid justify-content-end">
                    {!user.isLogged &&
                        <button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target="#loginModal" type="button">Login</button>}
                    {!user.isLogged &&
                        <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#registerModal" type="button">Register</button>}
                    {user.isLogged && <p className="text-md text-primary me-3 mb-0">Olá {user.name}!</p>}
                    {(user.isLogged && (user.isAdmin=='Usuario')) &&
                        <button className="btn btn-sm btn-success me-2" type="button" data-bs-toggle="modal" data-bs-target="#editModal">Alterar</button>
                        }
                    {(user.isLogged && (user.isAdmin=='Admin')) &&
                        <button className="btn btn-sm btn-success me-2" type="button" data-bs-toggle="modal" data-bs-target="#registerModal">Criar usuario</button>}
                    {user.isLogged &&
                        <button className="btn btn-sm btn-success" type="button" onClick={(e) => Logout(e)}>Logout</button>}
                    
                </form>
            </nav>
            <LoginModal />
            <RegisterModal />
            {(user.isLogged && (user.isAdmin=='Usuario')) &&
                        <EditModal usrold= {user} modal={'user'} />
                }
            
        </>
    )
}

export default Navbar