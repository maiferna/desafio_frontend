import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { VisitsList } from '../../components/workers/VisitsList';
import { RouteMap } from '../../components/workers/RouteMap';
import { useNavigate } from 'react-router';

export const WorkerDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <main className="my-5 pb-5">
      <HeaderHero 
        title="Panel de operario"
        subtitle=""
      />
      <div className="d-flex justify-content-center mb-5 pb-5">
        {/* <button type="button" className="btn btn-dark btn-lg me-2 rounded-1" onClick={() => navigate("/worker/dashboard")}>Ruta del día</button> */}
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("make-report")}>Crear nuevo informe</button>
      </div>

      <VisitsList title="Visitas asignadas"/>
      <RouteMap/>

      {/* <section>
        <p>Materiales (igual no es necesario)</p>
      </section> */}
    </main>
  )
}
