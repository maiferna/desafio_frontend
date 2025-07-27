import { VisitRow } from './VisitRow'
import { FilterByBar } from '../ui/FilterByBar'

export const VisitsList = ({ visits = [], title = "Visitas asignadas" }) => {
  return (
    <section className="p-5 pt-0 mb-5 container justify-content-center align-items-center">
      <h3 className="fw-bold pb-3 mb-0 pb-0">{title}</h3>
      <FilterByBar />
      <ul className="list-group">
        {visits.map((visit) => (
          <li key={visit.id_visita} className="list-group-item">
            <VisitRow
              visitId={visit.id_visita}
              place={visit.direccion}
              client={visit.cliente}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};