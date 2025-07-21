import React from 'react'
import { useNavigate } from 'react-router';

export const VisitRow = ({
    visit="1",
    place="Lugar",
    client="Cliente"
}) => {
    
  const navigate = useNavigate(); 

  return (
    <article className="pt-2 pb-2 px-2 d-flex justify-content-between">
        <div>
            <p className="card-text mb-1 fw-bold">Visita {visit}</p>
            <p className="card-text mb-1">{place}</p>
            <p className="card-text mb-1">{client}</p>
        </div>

        <div className="d-flex flex-column justify-content-center gap-1">
            <input type="checkbox" className="btn-check" id="done1" autoComplete="off"/>
            <label className="btn btn-sm btn-outline-primary rounded-1" htmlFor="done1">Terminada</label>
            <button type="button" className="btn btn-dark btn-sm rounded-1" onClick={() => navigate("../visit-detail")}>Ver detalles</button>
        </div>
    </article>
  )
}
