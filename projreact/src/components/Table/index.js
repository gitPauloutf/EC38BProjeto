import { useEffect, useState } from "react"
import {list,del} from "../../service/Api"
import EditModal from "../EditModal"
import { useNavigate } from "react-router-dom";

const Tables = () => {
    const [usrold, setUsrOld] = useState('')
    const navigate = useNavigate()
    const delUser = async (usr) => {
      const res = await del(usr.usr)
      navigate(0)
  }
  
    const getlist = async () => {
      const res = await list('list',null)

      setTlist(res.users)
    }

    useEffect(() => {
      getlist().catch(console.error);
    }, [])

    var [tlist, setTlist] = useState([])
    var itermax = 15;

    const createTable = (usertb,index) =>{
      if (index < itermax) return (
        <>
        <tr>
        <td>{usertb.usr}</td>
        <td>{usertb.name}</td>
        <td>{usertb.isAdmin}</td>
        <td className='text-center'>
        <button className="btn btn-danger me-2" type="button"  onClick={() => delUser(usertb)}>Deletar</button>
        <button className="btn btn-warning" type="button" data-bs-toggle="modal" onClick={() => setUsrOld(usertb)} data-bs-target="#editModal">Alterar</button>
        </td>
        </tr>

        </>
      )
      else return
    }
    
    return (
    <>
      <table className="table table-striped">
        <thead className='thead-dark table-dark'>
        <tr>
          <th>Usuario</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th className='text-center'>Ações</th>
        </tr>
        </thead>
        <tbody>
          {tlist.map((iter,index) => {return createTable(iter,index)})}
        </tbody>
        </table>
        <EditModal usrold={usrold} modal={'admin'} />
    </>
    )
}

export default Tables