// PLANTILLA BASE:
// Automatiza la inserción de navbar y footer en cada página

// IMPORTS
import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'


/* LAYOUT: 
  estructura base para todas las páginas.
  Todas las rutas están anidadas dentro del layout y se renderizarán en <Outlet/> */
export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  )
}