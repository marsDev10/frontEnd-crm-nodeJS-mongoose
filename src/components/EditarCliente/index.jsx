import { useEffect, useState } from 'react';
import { clienteAxios } from '../../config/API';

import { useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';

const EditarCliente = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });

    const consultaAPI = async () => {

        const res = await clienteAxios.get(`/clientes/${id}`);

        setCliente(res.data);
    };

    useEffect(() => {

        consultaAPI();

    }, []);


    const actualizarCliente = async ( cliente ) => {
        
        const res = await clienteAxios.put(`/clientes/${id}`, cliente);

        console.log(res);

        if(res.data.code === 11000){

            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Ese cliente ya esta registrado',
            });

        } else {

            Swal.fire(
                "Se actualizo con exíto",
                res.statusText,
                'success'
            );

            navigate(-1);
        }

        


    }

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        actualizarCliente(cliente);
    }

    const validarCliente = () => {

        // Destructuring
        const { nombre, apellido, email, empresa, telefono} = cliente;

        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        // return true o false
        return valido;
    }

  return (
    <>
        <h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                type="text" 
                placeholder="Nombre Cliente"
                onChange={handleChange}
                name="nombre"
                value={cliente.nombre}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input 
                type="text" 
                placeholder="Apellido Cliente"
                onChange={handleChange}
                name="apellido"
                value={cliente.apellido}
                />
            </div>

            <div className="campo">
                <label>Empresa:</label>
                <input 
                type="text" 
                placeholder="Empresa Cliente"
                onChange={handleChange} 
                name="empresa"
                value={cliente.empresa}
                />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input 
                type="email"
                placeholder="Email Cliente"
                onChange={handleChange}
                name="email"
                value={cliente.email}
                />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input 
                type="tel"
                placeholder="Teléfono Cliente"
                onChange={handleChange}
                name="telefono"
                value={cliente.telefono}
                />
            </div>

            <div className="enviar">
                    <input 
                    type="submit" 
                    className="btn btn-azul" 
                    value="Agregar Cliente"
                    disabled={ validarCliente() }
                    />
            </div>

        </form>
    </>
  )
}

export default EditarCliente;