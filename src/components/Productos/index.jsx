import { useState, useEffect } from 'react';

import { clienteAxios } from "../../config/API";
import { Link } from 'react-router-dom';

import { Producto } from '../Producto';

const Productos = () => {

  const [productos, setProductos] = useState([]);

  const consultarAPI = async () => {
    try {
    
      const res = await clienteAxios.get('/productos');

      setProductos(res.data);

    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {

    consultarAPI();

  }, [productos]);

    return (
      <>
        <h2>Productos</h2>
        <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
            <i className="fas fa-plus-circle"></i>
            Nuevo Producto
        </Link>
        <ul className="listado-productos">
            {productos.map(producto => (
                <Producto 
                    key={producto._id}
                    producto={producto}
                />
            )).reverse()}
        </ul>
      </>
    )
  }
  
  export { Productos };