import { useState, useEffect } from 'react';
import { VisitRouteCard } from './VisitRouteCard';
import { fetchCall } from '../../../utils/fetchCall';

export const VisitsRoutes = ({ visits, routes, setVisits, setRoutes }) => {
  const [allUsers, setAllUsers] = useState([]);
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchCall(`${urlBase}users`);
        setAllUsers(users);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsers();
  }, []
  );

  return (
    <section className="px-5">
      <h3 className="fw-bold pb-3 mb-0 pb-0">Rutas</h3>
      <div className="d-flex justify-content-center gap-2">
        <button
          type="button"
          className="btn btn-dark btn-lg mb-3 rounded-1 w-100"
          onClick={() => navigate("/planner")}>
          Generar rutas con visitas disponibles
        </button>
      </div>
      {routes.map(route => {
        const visitasAsignadas = visits.filter(v => v.id_ruta === route.id_ruta);


        const worker = allUsers.find(user => user.id_usuario === route.tecnico);
        return (
          <VisitRouteCard
            key={route.id_ruta}
            id={route.id_ruta}
            worker={worker?.nombre}
            visits={visitasAsignadas}
            setVisits={setVisits}
            setRoutes={setRoutes}
          />
        );
      })}
    </section>
  );
};