import React from 'react'
import { useNavigate } from 'react-router';

export const ReportRow = ({
    id="1",
    workType="Tipo de trabajo",
    client="Cliente"
}) => {
    
  const navigate = useNavigate(); 

  return (
    <article className="pt-2 pb-2 px-2 d-flex justify-content-between">
        <div>
            <p className="card-text mb-1 fw-bold">Informe {id}</p>
            <p className="card-text mb-1">{workType}</p>
            <p className="card-text mb-1">{client}</p>
        </div>

        <div className="d-flex flex-column justify-content-center gap-1">
            <input type="checkbox" className="btn-check" id="checked1" autoComplete="off"/>
            <label className="btn btn-sm btn-outline-primary rounded-1" htmlFor="checked1">Revisado</label>
            <button type="button" className="btn btn-dark btn-sm rounded-1" onClick={() => navigate("report-detail")}>Ver detalles</button>
        </div>
    </article>
  )
}
