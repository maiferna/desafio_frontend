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
        <article className="pt-2 pb-3 px-2 d-flex justify-content-between">
            <div>
                <p className="card-text text-muted mb-1 fw-bold">{service.nombre}</p>
                <p className="card-text text-muted mb-1">{service.descripcion}</p>
            </div>
            <button className="btn btn-sm btn-dark mt-2 rounded-1 align-self-start" onClick={onDeleteService}>Eliminar servicio</button>
            <button className="btn btn-sm btn-dark mt-2 rounded-1 align-self-start" onClick={onEditService}>Editar servicio</button>
        </article>
    )
}
