import { useContext, useState, useEffect } from "react"
import Context from "../../context"
import {alter} from "../../service/Api"
import { useNavigate } from "react-router-dom";
const EditModal = ({usrold}) => {
    const [user, setUser] = useContext(Context);
    const [name, setName] = useState('');
    const [usr, setUsr] = useState('');
    const [adm, setAdm] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        if (user.isAdmin=='Usuario'){
            setAdm('Usuario')
        }
    }, [user])

    useEffect(() => {
        setName(usrold.name);
        setUsr(usrold.usr);
        setAdm(usrold.isAdmin);
    }, [usrold])

    const Alter = async (e) => {
        e.preventDefault();

        const res = await alter(usrold.usr, {usr: usr, name: name, isAdmin: adm},user.token)
        if(!res.status) alert(res.mensagem)
        else alert('Usuario editado')
        navigate('/')
    }

    return (
        <div className="modal" id="editModal" aria-labelledby="editModal" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Alterar Usuario</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="name" placeholder={name} value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="usr" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="usr"  placeholder={usr} value={usr} onChange={(e) => setUsr(e.target.value)} />
                            </div>
                            
                            {(user.isAdmin=='Admin') &&
                            
                            <div className="mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="isAdmin" id="radadm" checked={adm === 'Admin'} value={'Admin'} onChange={(e) => setAdm(e.target.value)}/>
                                    <label className="form-check-label"htmlFor="radadm">Admin</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="isAdmin" id="radusr" checked={adm === 'Usuario'} value={'Usuario'} onChange={(e) => setAdm(e.target.value)}/>
                                    <label className="form-check-label"htmlFor="radusr">Usuario</label>
                                </div>
                                
                            </div>}
                            
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => Alter(e)}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditModal