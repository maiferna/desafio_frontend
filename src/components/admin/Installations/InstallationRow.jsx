import React from 'react'
import { useNavigate } from 'react-router';

export const InstallationRow = ({ installation, setInstallations }) => {
    const navigate = useNavigate();
    const onEditInstallation = () => {
        navigate(`/admin/manage-installation/edit/${installation.id_instalacion}`);
    }
    const onDeleteInstallation = () => {
        fetchCall(`${import.meta.env.VITE_API_URL_BASE}installations/${installation.id_instalacion}`, "DELETE")
        setInstallations(prevData => prevData.filter(i => i.id_instalacion !== installation.id_instalacion));
    }
    return (
        <article className="card rounded-1 overflow-hidden">
            <div className="card-body d-flex justify-content-between">
                <div>
                    <p className="card-title fw-semibold mb-0">{installation.nombre}</p>
                    <p className="card-text text-muted mb-0">{installation.direccion}</p>
                    <p className="card-text text-muted">{installation.locality}</p>
                </div>

                <div className="d-inline-flex flex-column gap-2">
                    <button onClick={onDeleteInstallation} className="btn btn-outline-danger btn-sm">Borrar instalación</button>
                    <button onClick={onEditInstallation} className="btn btn-dark btn-sm">Editar info</button>
                </div>
            </div>
        </article>
    )
}