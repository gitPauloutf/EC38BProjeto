import LoginModal from "../LoginModal"
import RegisterModal from "../RegisterModal"
import { useContext } from "react"
import Context from "../../context"

const Navbar = () => {
    const [user, setUser] = useContext(Context);

    const Logout = (e) => {
        e.preventDefault();

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
                    {user.isLogged &&
                        <button className="btn btn-sm btn-success" data-bs-toggle="modal" type="button" onClick={(e) => Logout(e)}>Logout</button>}
                </form>
            </nav>
            <LoginModal />
            <RegisterModal />
        </>
    )
}

export default Navbar