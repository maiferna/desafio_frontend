import { VisitRowAdmin } from './VisitRowAdmin';
import { fetchCall } from '../../../utils/fetchCall';

export const VisitRouteCard = ({ id, worker, visits = [], setRoutes, setVisits }) => {
  const handleDeleteRoute = async () => {
    const confirmDelete = confirm(`¿Seguro que deseas eliminar la ruta #${id}?`);
    if (!confirmDelete) return;

    try {
      await fetchCall(`${import.meta.env.VITE_API_URL_BASE}routes/${id}`, "DELETE");

      // Refrescar rutas y visitas
      const updatedRoutes = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}routes`);
      const updatedVisits = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits`);
      setRoutes(updatedRoutes);
      setVisits(updatedVisits);
    } catch (error) {
      console.error("Error al eliminar ruta", error);
    }
  };

  return (
    <article className="list-group border border-secondary-subtle p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <p className="fw-bold fs-5 mb-0">Ruta {id}</p>
          <p className="mb-2">Operario asignado: {worker}</p>
        </div>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDeleteRoute}
        >
          Eliminar ruta
        </button>
      </div>

      {visits.length === 0 ? (
        <p className="text-muted">No hay visitas asignadas a esta ruta.</p>
      ) : (
        visits.map(visit => (
          <div className="list-group-item rounded-3" key={`visit-ruta-${visit.id_visita}`}>
            <VisitRowAdmin visit={visit} setVisits={setVisits} />
          </div>
        ))
      )}
    </article>
  );
};