import { useState, useEffect } from 'react';

import { clienteAxios } from "../../config/API";
import Cliente from '../Cliente';
import { Link } from 'react-router-dom';


const Clientes = () => {

  const [clientes, setClientes] = useState([]);
  const [action, setAction] = useState(false);

  const consultarAPI = async () => {
    try {

      const res = await clienteAxios({
        url: '/clientes',
      });

      setClientes(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    consultarAPI();

  }, [action])

  return (
    <>
    <h2>Clientes</h2>
    <Link
    to='/clientes/nuevo' 
    className="btn btn-verde nvo-cliente"> 
      <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
    </Link>
    <ul className="listado-clientes">
      { clientes.length ? clientes.map(el => (
        <li className="cliente" key={el._id}>
          <Cliente
            id={el._id}
            nombre={el.nombre}
            apellido={el.apellido}
            empresa={el.empresa}
            correo={el.email}
            telefono={el.telefono}
            action={action}
            setAction={setAction}
          />
        </li>
      )).reverse() 
      : <p> No tienes clientes D: </p>}
    </ul>
    </>
  )
}

export default Clientes;