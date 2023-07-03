import { Outlet } from "react-router-dom";

const ContainerMain = () => {
  return (
    <main className="caja-contenido col-9">
        { <Outlet/> }
    </main>
  )
}

export { ContainerMain };