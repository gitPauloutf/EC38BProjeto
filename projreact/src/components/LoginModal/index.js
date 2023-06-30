import { useState, useContext } from "react"
import {login} from "../../service/Api"
import { useNavigate } from "react-router-dom";
import Context from "../../context";

const LoginModal = () => {
    const [usr, setUsr] = useState("");
    const [pw, setPw] = useState("")
    const navigate = useNavigate();
    const [user, setUser] = useContext(Context)

    const Login = async (e) => {
        e.preventDefault();
        const res = await login(usr, pw);
        console.log(res)
        if (res.status) {
            setUser({
                usr: res.usr,
                name: res.name,
                isAdmin: res.isAdmin,
                isLogged: true,
            })
            navigate("/dashboard")
        }
        else alert("Falha ao realizar o login")
        
    }
    return (
        <div className="modal" id="loginModal" aria-labelledby="loginModal" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="usr" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="usr" value={usr} onChange={(e) => setUsr(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pw" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="pw" value={pw} onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => Login(e)}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginModal