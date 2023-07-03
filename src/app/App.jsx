import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";

import { Clientes } from '../components/Clientes'
import { Pedidos } from '../components/Pedidos';
import { Productos } from '../components/Productos';
import { NuevoCliente } from "../components/NuevoCliente";
import { EditarCliente } from "../components/EditarCliente";
import { EditarProducto } from "../components/EditarProductos";
import { NuevoProducto } from "../components/NuevoProducto";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Clientes/>}/>
          <Route path="/productos" element={<Productos/>}/> 
          <Route path="/pedidos" element={<Pedidos/>}/> 
          <Route path="/clientes/nuevo" element={<NuevoCliente/>}/>
          <Route path="/clientes/editar/:id" element={<EditarCliente/>}/>
          <Route path="/productos/editar/:id" element={<EditarProducto/>}/>
          <Route path="/productos/nuevo/" element={<NuevoProducto/>}/> 
        </Route>
        <Route path="*" element={<p> Not Found</p>}> </Route>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
