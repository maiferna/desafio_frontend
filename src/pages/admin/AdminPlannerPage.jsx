import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { VisitsListAdmin } from '../../components/admin/Visits/VisitsListAdmin'
import { VisitsRoutes } from '../../components/admin/Visits/VisitsRoutes'

export const AdminPlannerPage = () => {
  return (
    <main className="mb-5 pb-5">
      <HeaderHero 
        title="Planificación"
        subtitle=""
      />
      {/* <div className="d-flex justify-content-center gap-2">
        <button type="button" className="btn btn-dark btn-lg mb-5 rounded-1" onClick={() => navigate("/planner")}>Lista de visitas</button>
        <button type="button" className="btn btn-dark btn-lg mb-5 rounded-1" onClick={() => navigate("/planner")}>Lista de rutas</button>
      </div> */}
      
      <VisitsListAdmin title="Listado de visitas"/>

      <VisitsRoutes/>
    </main>
  )
}
