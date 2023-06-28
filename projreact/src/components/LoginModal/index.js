import { useState } from "react"
import {login} from "../../service/Api"
const LoginModal = () => {

    const [usr, setUsr] = useState("");
    const [pw, setPw] = useState("")

    const Login = (e) => {
        e.preventDefault();
        console.log(usr)
        login(usr,pw)
    }

    return (
        <div class="modal" id="loginModal" aria-labelledby="loginModal" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Login</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="usr" class="form-label">Usuario</label>
                                <input type="text" class="form-control" id="usr" value={usr} onChange={(e) => setUsr(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="pw" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="pw" value={pw} onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={(e) => Login(e)}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginModal