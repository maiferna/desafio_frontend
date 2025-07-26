import { VisitRowAdmin } from './VisitRowAdmin';
import { FilterByBar } from '../../ui/FilterByBar';

export const VisitsListAdmin = ({ title = "title", visits, setVisits }) => {
  // Filtrar visitas sin ruta asignada
  const unassignedVisits = visits?.filter(visit => !visit.id_ruta) || [];

  return (
    <section className="px-5 py-4 pt-0 mb-5 container justify-content-center align-items-center gap-1">
      <h3 className="fw-bold my-3 px-sm-1 px-md-0">Lista de visitas</h3>

      <FilterByBar />

      {unassignedVisits.length === 0 ? (
        <p className="text-muted">No hay visitas pendientes de asignar.</p>
      ) : (
        unassignedVisits.map(visit => (
          <VisitRowAdmin
            visit={visit}
            setVisits={setVisits}
            key={`visit-${visit.id_visita}`}
          />
        ))
      )}
    </section>
  );
};