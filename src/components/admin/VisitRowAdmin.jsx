import React from 'react'
import { useNavigate } from 'react-router';
import { useFetch } from '../../hooks/useFetch';

export const VisitRowAdmin = ({
  visit,
  setData
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_URL_BASE}visits/details/${visit.id_visita}`)

  const onEditVisit = () => {
    console.log("ON EDIT: ", `/admin/manage-visits-edit/${visit.id_visita}`)
    navigate(`/admin/manage-visits-edit/${visit.id_visita}`)
  }

  const onDeleteVisit = () => {
    setData(prevData => prevData.filter(v => v.id_visita !== visit.id_visita));
    fetchCall(`${import.meta.env.VITE_API_URL_BASE}services/${service.id_servicio}`, "DELETE")
  }

  return (
    <article className="pt-1 pb-1 px-2 d-flex justify-content-between">
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <>
            <p className="card-text mb-1 fw-bold">{`${data[0]?.cliente}: ${data[0]?.direccion_instalacion}`}</p>
            {data.map(row => <p className="card-text mb-1" key={`row-${row.servicio}`}>{row.servicio}</p>)}
            <label className="btn btn-sm btn-outline-danger rounded-1" htmlFor="done1">TODO: AQUI DEBERIAMOS DE AÑADIR EL ESTADO</label>
          </>
        )}
      </div>

      <div className="d-flex flex-column justify-content-center gap-1">
        <input type="checkbox" className="btn-check" id="done1" autoComplete="off" />
        <button type="button" className="btn btn-dark btn-sm rounded-1" onClick={onEditVisit}>Editar</button>
        <button type="button" className="btn btn-dark btn-sm rounded-1" onClick={onDeleteVisit}>Eliminar</button>
      </div>
    </article>
  );

}
// 