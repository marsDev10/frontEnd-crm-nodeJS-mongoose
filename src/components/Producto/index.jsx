
import { Link } from 'react-router-dom';
import { clienteAxios } from '../../config/API';

import Swal from 'sweetalert2';

const Producto = ({ producto }) => {

    const { _id, nombre, precio, imagen } = producto;

    const eliminarProducto = async () => {
        try {

            const resul = await Swal.fire({
                title: "¿Estás seguro?",
                text: "El producto eliminado no se puede recuperar",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar',
            })
            
            if(resul?.isConfirmed) {

                
                const res = await clienteAxios.delete(`/productos/${_id}`);
                
                if(res.status === 200){
                    
                    await Swal.fire(
                        'Eliminado',
                        res.data.message,
                        'success',
                    );
                }

            }


        } catch (err) {
            console.log(err);
        }
    }

  return (
    <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
                { imagen ? (
                    <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="100px"/>
                ) : null  }
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={ eliminarProducto }
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
  )
}

export { Producto };