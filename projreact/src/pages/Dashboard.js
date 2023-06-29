import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

const Dashboard = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-fill bg-body-tertiary">
                <div className='bg-secondary py-2 text-center' >
                    <h1 className='text-muted'>Área do Admin</h1>
                </div>
                <div>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard