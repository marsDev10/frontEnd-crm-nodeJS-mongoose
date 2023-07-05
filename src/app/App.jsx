import { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";

// Aplicar Lazy Loading
const LazyClientes = lazy(() => import('../components/Clientes'));
const LazyProductos = lazy(() => import('../components/Productos'));
const LazyPedidos = lazy(() => import('../components/Pedidos'));
const LazyNuevoCliente = lazy(() => import('../components/NuevoCliente'));
const LazyEditarCliente = lazy(() => import('../components/EditarCliente'));
const LazyNuevoProducto = lazy(() => import('../components/NuevoProducto'));
const LazyEditarProduto = lazy(() => import('../components/EditarProducto'));

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={
              <Suspense fallback="Loading...">
                <LazyClientes/>
              </Suspense>
            }/>
          <Route path="/productos" element={
            <Suspense fallback="Loading...">
              <LazyProductos/>
            </Suspense>
           }/> 
          <Route path="/pedidos" element={
            <Suspense fallback="Loading...">
              <LazyPedidos/>
            </Suspense>
            }/> 
          <Route path="/clientes/nuevo" element={
            <Suspense fallback="Loading...">
              <LazyNuevoCliente/>
            </Suspense>
            }/>
          <Route path="/clientes/editar/:id" element={
            <Suspense fallback="Loading...">
              <LazyEditarCliente/>
            </Suspense>
            }/>
          <Route path="/productos/editar/:id" element={
            <Suspense fallback="Loading...">
              <LazyEditarProduto/>
            </Suspense>
          }/>
          <Route path="/productos/nuevo/" element={
            <Suspense fallback="Loading...">
              <LazyNuevoProducto/>
            </Suspense>
            }/> 
        </Route>
        <Route path="*" element={<p> Not Found</p>}> </Route>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
