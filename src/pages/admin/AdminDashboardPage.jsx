import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { useNavigate } from 'react-router';
import { ReportsList } from '../../components/admin/ReportsList';
import { Graphics } from '../../components/admin/Graphics';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <main className="my-5 pb-5">
      <HeaderHero 
        title="Panel de administrador"
        subtitle=""
      />
      <div className="d-flex flex-wrap justify-content-center mb-5 pb-5 gap-3 mx-5">
        {/* <button type="button" className="btn btn-dark btn-lg me-2 rounded-1" onClick={() => navigate("/worker/dashboard")}>Ruta del día</button> */}
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("planner")}>Gestionar visitas (plan) </button>
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("manage-workers")}>Gestionar operarios</button>
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("manage-clients")}>Gestionar clientes</button>
      </div>

      <ReportsList title="Listado de informes"/>
      <Graphics/>

    </main>
  )
}
