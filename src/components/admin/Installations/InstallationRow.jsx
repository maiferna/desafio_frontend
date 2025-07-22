import React from 'react'

export const InstallationRow = ({
    name = "Nombre de instalación",
    adress = "Dirección",
    onDelete,
    onEdit
}) => {

    return (
        <article className="card rounded-1 overflow-hidden">
            <div className="card-body d-flex justify-content-between">
                <div>
                    <p className="card-title fw-semibold mb-0">{name}</p>
                    <p className="card-text text-muted mb-0">{adress}</p>
                </div>

                <div className="d-inline-flex flex-column gap-2">
                    <button onClick={onDelete} className="btn btn-outline-danger btn-sm">Borrar instalación</button>
                    <button onClick={onEdit} className="btn btn-dark btn-sm">Ver detalle</button>
                </div>
            </div>
        </article>
    )
}