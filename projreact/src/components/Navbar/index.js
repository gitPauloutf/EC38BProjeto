import LoginModal from "../LoginModal"
import RegisterModal from "../RegisterModal"

const Navbar = () => {
    return (
        <>
            <nav class="navbar bg-dark">
                <form class="container-fluid justify-content-end">
                    <button class="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target="#loginModal" type="button">Login</button>
                    <button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#registerModal" type="button">Register</button>
                </form>
            </nav>
            <LoginModal />
            <RegisterModal />
        </>
    )
}

export default Navbar