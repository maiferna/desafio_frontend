import { useNavigate } from 'react-router';
import { useFetch } from '../../../hooks/useFetch';
import { fetchCall } from '../../../utils/fetchCall';
import { useState, useEffect } from 'react';

export const VisitRowAdmin = ({
  visit,
  setVisits
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_URL_BASE}visits/details/${visit.id_visita}`);

  const [showAssignForm, setShowAssignForm] = useState(false);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState('');

  const onEditVisit = () => {
    navigate(`/admin/manage-visits-edit/${visit.id_visita}`);
  };

  const onDeleteVisit = async () => {
    setVisits(prevData => prevData.filter(v => v.id_visita !== visit.id_visita));
    await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits/${visit.id_visita}`, "DELETE");
  };

  const refreshVisits = async () => {
    try {
      const updatedVisits = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits`, "GET");
      setVisits(updatedVisits);
    } catch (error) {
      console.error("Error al refrescar visitas", error);
    }
  };

  const handleAssignRoute = async () => {
    try {
      await fetchCall(
        `${import.meta.env.VITE_API_URL_BASE}visits/${visit.id_visita}/route`,
        "PUT",
        { "Content-Type": "application/json" },
        { routeId: selectedRouteId }
      );
      setShowAssignForm(false);
      await refreshVisits();
    } catch (error) {
      console.error("Error al asignar ruta", error);
    }
  };

  const handleUnassignRoute = async () => {
    try {
      await fetchCall(
        `${import.meta.env.VITE_API_URL_BASE}visits/${visit.id_visita}/route`,
        "PUT",
        { "Content-Type": "application/json" },
        { routeId: null }
      );
      await refreshVisits();
    } catch (error) {
      console.error("Error al desasignar ruta", error);
    }
  };

  useEffect(() => {
    if (showAssignForm) {
      const fetchRoutes = async () => {
        try {
          const response = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}routes`, "GET");
          setAvailableRoutes(response);
        } catch (error) {
          console.error("Error al obtener rutas", error);
        }
      };
      fetchRoutes();
    }
  }, [showAssignForm]);

  return (
    <article className="py-1 px-2 d-flex flex-row justify-content-between card rounded-1">
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <>
            <p className="card-text mb-1 fw-bold">
              {`${data[0]?.cliente}: ${data[0]?.direccion_instalacion}`}
            </p>
            <p className="card-text mb-1">
              Ruta asignada: {visit.id_ruta ? `#${visit.id_ruta}` : "No asignada"}
            </p>
            {data.map(row => (
              <p className="card-text mb-1" key={`row-${row.servicio}`}>{row.servicio}</p>
            ))}
            <label className="btn btn-sm btn-outline-danger rounded-1" htmlFor="done1">
              TODO: AQUI DEBERIAMOS DE AÑADIR EL ESTADO
            </label>
          </>
        )}
      </div>

      <div className="d-flex flex-column justify-content-center gap-1">
        <input type="checkbox" className="btn-check" id="done1" autoComplete="off" />
        <button type="button" className="btn btn-dark btn-sm rounded-1" onClick={onEditVisit}>
          Editar
        </button>
        <button type="button" className="btn btn-outline-danger btn-sm rounded-1" onClick={onDeleteVisit}>
          Eliminar
        </button>

        {visit.id_ruta ? (
          <button
            type="button"
            className="btn btn-outline-warning btn-sm rounded-1"
            onClick={handleUnassignRoute}
          >
            Desasignar
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm rounded-1"
            onClick={() => setShowAssignForm(!showAssignForm)}
          >
            Asignar a ruta
          </button>
        )}

        {showAssignForm && (
          <div className="mt-2">
            <select
              className="form-select form-select-sm mb-1"
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
            >
              <option value="">Selecciona una ruta</option>
              {availableRoutes.map((route) => (
                <option key={route.id_ruta} value={route.id_ruta}>
                  Ruta {route.id_ruta}
                </option>
              ))}
            </select>
            <button
              className="btn btn-sm btn-success"
              onClick={handleAssignRoute}
              disabled={!selectedRouteId}
            >
              Guardar
            </button>
          </div>
        )}
      </div>
    </article>
  );
};