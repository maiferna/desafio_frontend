import React from 'react'
import { VisitRouteCard } from './VisitRouteCard'



export const VisitsRoutes = () => {
  return (
    <section className="px-5"> 
        <h3 className="fw-bold pb-3 mb-0 pb-0">Rutas </h3>
        <div className="d-flex justify-content-center gap-2">
            <button 
                type="button" 
                className="btn btn-dark btn-lg mb-3 rounded-1 w-100" 
                onClick={() => navigate("/planner")}>
                Generar rutas con visitas disponibles
                </button>
            {/* <button type="button" className="btn btn-dark btn-lg mb-5 rounded-1" onClick={() => navigate("/planner")}>Lista de rutas</button> */}
        </div>
        
        <VisitRouteCard/>
        <VisitRouteCard/>
        <VisitRouteCard/>

    
    </section>
    
  )
}
