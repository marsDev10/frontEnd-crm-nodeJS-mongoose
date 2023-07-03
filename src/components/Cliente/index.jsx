import { Link } from "react-router-dom"
import { clienteAxios } from "../../config/API";
import Swal from "sweetalert2";

const Cliente = ({
    id,
    nombre,
    apellido,
    empresa,
    correo,
    telefono,
}) => {

    const elimimarCliente = async () => {
        try { 

            const resul = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Un cliente eliminado no se puede recuperar",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar',
            })
            
            if(resul?.isConfirmed) {

                
                const res = await clienteAxios.delete(`/clientes/${id}`);
                
                if(res){
                    
                    await Swal.fire(
                        'Eliminado',
                        res.data.message,
                        'success',
                    );
                }

            }




        } catch(err) {

            console.log(err);
        }
    };


  return (
    <>
        <div className="info-cliente">
            <p className="nombre"> { nombre + " " + apellido} </p>
            <p className="empresa"> { empresa } </p>
            <p>{ correo }</p>
            <p>Tel: { telefono }</p>
        </div>
        <div className="acciones">
            <Link 
            to={`/clientes/editar/${id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Cliente
            </Link>
            <button 
            type="button"
            onClick={elimimarCliente} 
             className="btn btn-rojo btn-eliminar">
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
        </div>
    </>
  )
}

export default Cliente