import React from 'react'

export const HiredServiceCard = ({
    id="1",
    serviceType="Tipo de servicio", 
    description="Descripción de servicio",
    hiredDate="19-07-2025",
    state="En proceso",
  }) => {

  return (
    <div className="container d-flex justify-content-center align-items-center mb-5 pb-5">
      <article className="w-100 card border-0 shadow-lg rounded-1 pt-2 pb-3 mb-5 px-4 mx-3 mt-3">
        <div className="card-body text-left">
          <p className="card-title fs-4 fw-bold mb-2">Servicio Contratado {id}</p>

          <p className="card-text text-muted mb-1 fw-medium">{serviceType}</p>

          <p className="card-text text-muted mb-1">Estado: "{state}"</p>
          <p className="card-text text-muted mb-1">Fecha de contratación: {hiredDate}</p>

          <button className="btn btn-sm btn-dark mt-3 rounded-1"> Ver detalles de servicio </button>
        </div>
      </article>
    </div>
  )

}
