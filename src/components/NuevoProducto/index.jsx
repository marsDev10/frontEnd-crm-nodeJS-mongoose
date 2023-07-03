import { useState } from 'react';
import Swal from 'sweetalert2';
import { clienteAxios } from '../../config/API';
import { useNavigate } from 'react-router-dom';


const NuevoProducto = () => {

    const navigate = useNavigate();

    //producto = state, guardarProducto = setstate
    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    });
    // archivo = state, guardarArchivo = setState
    const [archivo, setArchivo] = useState('');

    // almacena el nuevo producto en la base de datos.
    const agregarProducto = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            navigate(-1)

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

    // leer los datos del formulario
    const leerInformacionProducto = e => {
        setProducto({
            // obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    // coloca la imagen en el state
    const leerArchivo = e => {
        setArchivo( e.target.files[0] );
    };

    const validarProducto = () => {

        // Destructuring
        const { nombre, precio } = producto;

        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !precio.length || !archivo.name;

        // return true o false
        return valido;
    }

  return (
    <>
        <h2>Nuevo Producto</h2>

        <form
            onSubmit={agregarProducto}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"
                    onChange={leerInformacionProducto}
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
                    onChange={leerInformacionProducto}
                />
            </div>

            <div className="campo">
                <label>Imagen:</label>
                <input 
                    type="file"  
                    name="imagen"
                    onChange={leerArchivo}
                />
            </div>

            <div className="enviar">
                    <input type="submit" 
                    className="btn btn-azul" 
                    value="Agregar Producto"
                    disabled={ validarProducto() }
                    />
            </div>
        </form>
    </>
  )
}

export { NuevoProducto } 