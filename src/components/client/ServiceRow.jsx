import React from 'react'

export const ServiceRow = ({
    id="1",
    serviceType="Tipo de servicio", 
    hiredDate="19-07-2025",
  }) => {
  return (
    <article className="pt-2 pb-3 px-2 d-flex justify-content-between">
      <div>
        <p className="card-text text-muted mb-1 fw-bold">{serviceType}</p>
        <p className="card-text text-muted mb-1">Fecha de contratación: {hiredDate}</p>
      </div>

      <button className="btn btn-sm btn-dark mt-2 rounded-1 align-self-start"> Ver detalles de servicio </button>
      <button className="btn btn-sm btn-light mt-2 rounded-1 align-self-start"> Descargar informe </button>
    </article>
  )
}
