import { useState, useEffect } from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { VisitsListAdmin } from '../../components/admin/Visits/VisitsListAdmin'
import { VisitsRoutes } from '../../components/admin/Visits/VisitsRoutes'
import { CreateRouteForm } from '../../components/admin/Routes/CreateRouteForm'
import { fetchCall } from '../../utils/fetchCall'


export const AdminPlannerPage = () => {
  const [visits, setVisits] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allVisits = await fetchCall(`${urlBase}visits`);
        const allRoutes = await fetchCall(`${urlBase}routes`);
        setVisits(allVisits);
        setRoutes(allRoutes);
      } catch (error) {
        console.log('Error al traer las visitas y rutas', error);
      }
    }
    fetchData();
  }, [])

  if (!visits || !routes) return null;

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

      <VisitsListAdmin
        title="Listado de visitas"
        visits={visits}
        setVisits={setVisits}
      />
      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-dark mb-3"
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? "Ocultar formulario" : "Crear una ruta"}
        </button>
      </div>
      {
        showForm && (
          <CreateRouteForm routes={routes} setRoutes={setRoutes} />
        )
      }

      <VisitsRoutes
        visits={visits}
        setVisits={setVisits}
        routes={routes}
        setRoutes={setRoutes}
      />
    </main>
  )
}
