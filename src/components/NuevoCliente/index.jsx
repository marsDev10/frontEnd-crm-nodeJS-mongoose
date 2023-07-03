import { useState } from 'react';
import { clienteAxios } from '../../config/API';

import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

const NuevoCliente = () => {

    const navigate = useNavigate();

    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });

    const agregarCliente = async ( cliente ) => {
        
        const res = await clienteAxios.post('/clientes', cliente);

        if(res.data.code === 11000){

            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Ese cliente ya esta registrado',
            });

        } else {

            Swal.fire(
                res.data.message,
                res.statusText,
                'success'
            );

            navigate(-1);
        }

        


    }

    const handleChange = (e) => {
        setNuevoCliente({
            ...nuevoCliente,
            [e.target.name]: e.target.value,
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        await agregarCliente(nuevoCliente);
    }

    const validarCliente = () => {

        // Destructuring
        const { nombre, apellido, email, empresa, telefono} = nuevoCliente;

        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        // return true o false
        return valido;
    }

  return (
    <>
        <h2>Nuevo Cliente</h2>
        <form onSubmit={handleSubmit}>
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                type="text" 
                placeholder="Nombre Cliente"
                onChange={handleChange}
                name="nombre"
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input 
                type="text" 
                placeholder="Apellido Cliente"
                onChange={handleChange}
                name="apellido"
                />
            </div>

            <div className="campo">
                <label>Empresa:</label>
                <input 
                type="text" 
                placeholder="Empresa Cliente"
                onChange={handleChange} 
                name="empresa"
                />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input 
                type="email"
                placeholder="Email Cliente"
                onChange={handleChange}
                name="email"
                />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input 
                type="tel"
                placeholder="Teléfono Cliente"
                onChange={handleChange}
                name="telefono"
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

export { NuevoCliente } 