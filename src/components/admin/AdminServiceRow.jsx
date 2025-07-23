import React from 'react'
import { useNavigate } from 'react-router';
import { fetchCall } from '../../utils/fetchCall';



export const AdminServiceRow = ({ service, setData }) => {
    const navigate = useNavigate();
    const onEditService = () => {
        navigate(`/admin/manage-services-edit/${service.id_servicio}`);
    }
    const onDeleteService = () => {
        setData(prevData => prevData.filter(s => s.id_servicio !== service.id_servicio));
        fetchCall(`${import.meta.env.VITE_API_URL_BASE}services/${service.id_servicio}`, "DELETE")
    }
    return (
        <article className="card rounded-1 overflow-hidden mb-3">
            <div className="card-body d-flex flex-column justify-content-between gap-3">
                
                <div>
                    <p className="card-title fw-semibold mb-0">{service.nombre}</p>
                    <p className="card-text text-muted mb-0">{service.descripcion}</p>
                </div>

                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-danger rounded-1 align-self-start" onClick={onDeleteService}>Eliminar servicio </button>
                    <button className="btn btn-sm btn-dark rounded-1 align-self-start" onClick={onEditService}>Editar servicio ⚙️</button>
                </div>
            </div>
        </article>
    )
}
