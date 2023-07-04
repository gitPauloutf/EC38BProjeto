import { useState, useContext } from "react"
import Context from "../../context"
import {reg} from "../../service/Api"
import { useNavigate } from "react-router-dom";
const RegisterModal = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [usr, setUsr] = useState("");
    const [pw, setPw] = useState("")
    const [isAdmin, setAdm] = useState("Usuario")

    const Register = async (e) => {
        e.preventDefault();
        const res = await reg(usr, pw, name,isAdmin)
        if(!res.status) alert(res.mensagem)
        else alert('Registrado')
        navigate('/');
    }

    return (
        <div className="modal" id="registerModal" aria-labelledby="registerModal" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Register</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="usr" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="usr" value={usr} onChange={(e) => setUsr(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pw" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="pw" value={pw} onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                {(user.isAdmin=='Admin') &&
                                <>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="isAdmin" id="radadm" value={'Admin'} onChange={(e) => setAdm(e.target.value)}/>
                                <label className="form-check-label"htmlFor="radadm">Admin</label>
                                </div>
                                    <div className="form-check">
                                <input className="form-check-input" type="radio" name="isAdmin" id="radusr" value={'Usuario'} onChange={(e) => setAdm(e.target.value)}/>
                                <label className="form-check-label"htmlFor="radusr">Usuario</label>
                                    </div>
                                </>}
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => Register(e)}>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterModal