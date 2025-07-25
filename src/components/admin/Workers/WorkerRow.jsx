export const WorkerRow = ({
  nombre = "Nombre",
  id = "id de operario",
  department = "Departamento",
  onDelete,
  onEdit
}) => {

  return (
    <article className="card rounded-1 overflow-hidden">
      <div className="card-body d-flex justify-content-between">
        <div>
          <p className="card-title fw-semibold mb-0">{nombre}</p>
          <p className="card-text text-muted mb-0">{id}</p>
          <p className="card-text text-muted">{department}</p>
        </div>

        <div className="d-inline-flex flex-column gap-2">
          <button onClick={onDelete} className="btn btn-outline-danger btn-sm">Borrar operario</button>
          <button onClick={onEdit} className="btn btn-dark btn-sm">Editar info</button>
        </div>
      </div>
    </article>
  )
}