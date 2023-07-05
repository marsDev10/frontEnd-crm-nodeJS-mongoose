
import {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { clienteAxios } from '../../config/API';

const EditarProducto = () => {

    const navigate = useNavigate();

    const { id } = useParams();
 
    const [ producto, setProducto ] = useState({
        nombre: '',
        precio: '',
        imagen : ''
    });

    const [archivo, setArchivo] = useState('');

    // cuando el componente carga
    useEffect(() => {
        // consultar la api para traer el producto a editar
       const consultarAPI = async () => {
           const productoConsulta = await clienteAxios.get(`/productos/${id}`);
           setProducto(productoConsulta.data);
       }

       consultarAPI();
   }, []);

   const handleChange = (e) => {

    setProducto({
        ...producto,
        [e.target.name]: e.target.value,
    })
   };   

   const leerArchivo = e => {
        setArchivo( e.target.files[0] );
    };

    const editarProducto = async ( e ) => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            navigate(-1);

        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    const { nombre, precio, imagen } = producto;


  return (
    <>
        <h2>Editar Producto</h2>

<form
    onSubmit={editarProducto}
>
    <legend>Llena todos los campos</legend>

    <div className="campo">
        <label>Nombre:</label>
        <input 
            type="text" 
            placeholder="Nombre Producto" 
            name="nombre"
            onChange={handleChange}
            defaultValue={nombre}
        />
    </div>

    <div className="campo">
        <label>Precio:</label>
        <input 
            type="number" 
            name="precio" 
            min="0.00" 
            step="0.01" 
            placeholder="Precio"
            onChange={handleChange}
            defaultValue={precio}
        />
    </div>

    <div className="campo">
        <label>Imagen:</label>
        { imagen ? (
            <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300" />
        ) : null }
        <input 
            type="file"  
            name="imagen"
            onChange={leerArchivo}
        />
    </div>

    <div className="enviar">
            <input type="submit" className="btn btn-azul" value="Editar Producto" />
    </div>
</form>
    </>
  )
}

export default EditarProducto;