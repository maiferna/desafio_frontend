import React, { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';
import { ServiceFormRenderer } from './ServiceFormRenderer';

export const EditVisit = ({ id }) => {
    const [instalaciones, setInstalaciones] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [selectedInstalacion, setSelectedInstalacion] = useState('');
    const [selectedServicios, setSelectedServicios] = useState([]);

    useEffect(() => {
        const loadInitialData = async () => {
            const [insts, servs] = await Promise.all([
                fetchCall(`${import.meta.env.VITE_API_URL_BASE}installations`),
                fetchCall(`${import.meta.env.VITE_API_URL_BASE}services`)
            ]);
            setInstalaciones(insts);
            setServicios(servs);

            if (id) {
                const { data: visitData } = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits/details/${id}`);
                console.log({ visitData })
                setSelectedInstalacion(visitData.id_instalacion);
                setSelectedServicios(visitData.map(row => row.id_servicio));
            }
        };

        loadInitialData();
    }, [id]);

    const handleAddServicio = (serviceId) => {
        if (!selectedServicios.includes(serviceId)) {
            setSelectedServicios(prev => [...prev, serviceId]);
        }
    };

    const handleRemoveServicio = (serviceId) => {
        setSelectedServicios(prev => prev.filter(id => id !== serviceId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (id) {
            // Update existing visit
            await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits/${id}`, "PUT", {}, {
                id_instalacion: selectedInstalacion,
                estado: "pendiente"
            });

            await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits/${id}/services`, "PUT", {}, {
                servicios: selectedServicios
            });

            alert("Visita actualizada");
        } else {
            // Create new visit
            const visita = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits`, "POST", {}, {
                id_instalacion: selectedInstalacion,
                estado: "pendiente"
            });

            for (const id_servicio of selectedServicios) {
                await fetchCall(`${import.meta.env.VITE_API_URL_BASE}service-executions`, "POST", {}, {
                    id_visita: visita.id_visita,
                    id_servicio,
                    observaciones: "",
                    datos: {}
                });
            }

            alert("Visita creada con servicios programados");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? "Editar visita" : "Crear nueva visita"}</h2>

            <label>Instalación:</label>
            <select
                onChange={e => setSelectedInstalacion(e.target.value)}
                value={selectedInstalacion}
                required
            >
                <option value="">Seleccione una instalación</option>
                {instalaciones.map(inst => (
                    <option key={inst.id_instalacion} value={inst.id_instalacion}>
                        {inst.direccion}
                    </option>
                ))}
            </select>

            <h3>Servicios disponibles</h3>
            <ul>
                {servicios.map(s => (
                    <li key={s.id_servicio}>
                        {s.nombre}
                        {!selectedServicios.includes(s.id_servicio) && (
                            <button type="button" onClick={() => handleAddServicio(s.id_servicio)}>
                                Añadir
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <h4>Servicios añadidos:</h4>
            <ul>
                {selectedServicios.map(id => {
                    const servicio = servicios.find(s => s.id_servicio === id);
                    return servicio ? (
                        <li key={id}>
                            {servicio.nombre}
                            <button type="button" onClick={() => handleRemoveServicio(id)}>Eliminar</button>
                            <ServiceFormRenderer serviceId={id} />
                        </li>
                    ) : null;
                })}
            </ul>

            <button type="submit">{id ? "Guardar cambios" : "Crear visita"}</button>
        </form>
    );
};
