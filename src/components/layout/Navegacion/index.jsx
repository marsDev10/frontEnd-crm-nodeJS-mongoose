import { NavLink } from "react-router-dom";

const Navegacion = () => {
  return (
    <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">
            <NavLink to="/" className="clientes">Clientes</NavLink>
            <NavLink to="/productos" className="productos">Productos</NavLink>
            <NavLink to="/pedidos" className="pedidos">Pedidos</NavLink>
        </nav>
    </aside>
  )
}

export { Navegacion };