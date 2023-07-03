import { Header } from "./Header"
import { Navegacion } from "./Navegacion"
import { ContainerPrincipal } from "../../containers/ContainerPrincipal"
import { ContainerMain } from "../../containers/ContainerMain";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
        <Header/>
        <ContainerPrincipal>
            <Navegacion/>
            <ContainerMain>
                <Outlet/>
            </ContainerMain>
        </ContainerPrincipal>
    </>

  )
}

export { Layout }