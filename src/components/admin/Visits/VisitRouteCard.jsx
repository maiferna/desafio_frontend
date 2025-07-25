import { VisitRowAdmin } from './VisitRowAdmin'

export const VisitRouteCard = ({ id = "01", worker = "Trabajador 1" }) => {
  return (
    <article className="list-group border border-secondary-subtle p-3 mb-3">
      <p className="fw-bold fs-5 mb-0">Ruta {id}</p>
      <p className="mb-3">Operario asignado: {worker}</p>

      <div className="list-group-item rounded-3"><VisitRowAdmin /></div>
      <div className="list-group-item rounded-3"><VisitRowAdmin /></div>
      <div className="list-group-item rounded-3"><VisitRowAdmin /></div>
    </article>
  )
}
