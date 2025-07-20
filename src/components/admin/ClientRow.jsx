import React from 'react'

export const ClientRow = ({ 
    nombre="Nombre",
    email="cliente@email.com", 
    activity="Tipo de actividad",
    onDelete, 
    onEdit  
  }) => {

  return (
    <article className="card rounded-1 overflow-hidden">
      <div className="card-body d-flex justify-content-between">
        <div>
          <p className="card-title fw-semibold mb-0">{nombre}</p>
          <p className="card-text text-muted mb-0">{email}</p>
          <p className="card-text text-muted">{activity}</p>
        </div>

        <div className="d-inline-flex flex-column gap-2">
          <button onClick={onDelete} className="btn btn-outline-danger btn-sm">Borrar cliente</button>
          <button onClick={onEdit} className="btn btn-dark btn-sm">Editar info</button>
        </div>
      </div>
    </article>
  )
}