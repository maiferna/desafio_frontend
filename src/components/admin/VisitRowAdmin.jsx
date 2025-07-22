import React from 'react'
import { useNavigate } from 'react-router';

export const VisitRowAdmin = ({
  visit,
  setData
}) => {

  const navigate = useNavigate();
  const onDeleteVisit = () => {
    setData(prevData => prevData.filter(v => s.id_visita !== visit.id_visit));
    fetchCall(`${import.meta.env.VITE_API_URL_BASE}services/${service.id_servicio}`, "DELETE")
  }
  return (
    <article className="pt-1 pb-1 px-2 d-flex justify-content-between">
      <div>
        <p className="card-text mb-1 fw-bold">as</p>
        <p className="card-text mb-1"></p>
        <p className="card-text mb-1"></p>
      </div>

      <div className="d-flex flex-column justify-content-center gap-1">
        <input type="checkbox" className="btn-check" id="done1" autoComplete="off" />
        <label className="btn btn-sm btn-outline-danger rounded-1" htmlFor="done1">ssss</label>
        <button type="button" className="btn btn-dark btn-sm rounded-1" onClick={onDeleteVisit}>Eliminar</button>
      </div>
    </article>
  )
}