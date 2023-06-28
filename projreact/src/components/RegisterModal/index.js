import { useState } from "react"
import {reg} from "../../service/Api"
const RegisterModal = () => {

    const [name, setName] = useState("");
    const [usr, setUsr] = useState("");
    const [pw, setPw] = useState("")

    const Register = (e) => {
        e.preventDefault();
        reg(usr, pw, name)
    }

    return (
        <div class="modal" id="registerModal" aria-labelledby="registerModal" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Register</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="usr" class="form-label">Usuario</label>
                                <input type="text" class="form-control" id="usr" value={usr} onChange={(e) => setUsr(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="pw" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="pw" value={pw} onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={(e) => Register(e)}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterModal