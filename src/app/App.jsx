import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";

import { Clientes } from '../components/Clientes'
import { Pedidos } from '../components/Pedidos';
import { Productos } from '../components/Productos';
import { NuevoCliente } from "../components/NuevoCliente";
import { EditarCliente } from "../components/EditarCliente";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Clientes/>}/>
          <Route path="/productos" element={<Pedidos/>}/> 
          <Route path="/pedidos" element={<Productos/>}/> 
          <Route path="/clientes/nuevo" element={<NuevoCliente/>}/>
          <Route path="/clientes/editar/:id" element={<EditarCliente/>}/> 
        </Route>
        <Route path="*" element={<p> Not Found</p>}> </Route>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
