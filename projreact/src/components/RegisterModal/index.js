import { useState } from "react"
import {reg} from "../../service/Api"
const RegisterModal = () => {

    const [name, setName] = useState("");
    const [usr, setUsr] = useState("");
    const [pw, setPw] = useState("")

    const Register = async (e) => {
        e.preventDefault();
        const res = await reg(usr, pw, name)
        if(!res.status) alert(res.mensagem)
        else alert('Registrado')
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
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="usr" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="usr" value={usr} onChange={(e) => setUsr(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pw" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="pw" value={pw} onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => Register(e)}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterModal