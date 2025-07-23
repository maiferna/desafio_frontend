import React, { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';
import { ServiceFormRenderer } from './ServiceFormRenderer';

export const CreateVisit = ({ id }) => {
    const [instalaciones, setInstalaciones] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [selectedInstalacion, setSelectedInstalacion] = useState('');
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [serviceExecutions, setServiceExecution] = useState([]);

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
                const exes = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}service-executions/visit/${id}`);
                setServiceExecution(exes);

                setSelectedInstalacion(visitData.id_instalacion);
                const serviciosConDatos = exes.map(exec => ({
                    id: exec.id_servicio,
                    data: exec.datos || {}
                }));
                setSelectedServicios(serviciosConDatos);
            }
        };

        loadInitialData();
    }, [id]);

    const handleAddServicio = (serviceId) => {
        if (!selectedServicios.find(s => s.id === serviceId)) {
            setSelectedServicios(prev => [...prev, { id: serviceId, data: {} }]);
        }
    };

    const handleRemoveServicio = (serviceId) => {
        setSelectedServicios(prev => prev.filter(s => s.id !== serviceId));
    };

    const handleFormChange = (serviceId, formData) => {
        setSelectedServicios(prev =>
            prev.map(s =>
                s.id === serviceId ? { ...s, data: formData } : s
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (id) {
            await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits/${id}`, "PUT", {}, {
                id_instalacion: selectedInstalacion,
                estado: "pendiente"
            });

            alert("Visita actualizada");
        } else {
            const visita = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits`, "POST", {}, {
                id_instalacion: selectedInstalacion,
                estado: "pendiente"
            });

            for (const { id: id_servicio, data } of selectedServicios) {

                await fetchCall(`${import.meta.env.VITE_API_URL_BASE}service-executions`, "POST", {}, {
                    id_visita: visita.id_visita,
                    id_servicio,
                    observaciones: "",
                    datos: data
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
                        {!selectedServicios.find(sel => sel.id === s.id_servicio) && (
                            <button type="button" onClick={() => handleAddServicio(s.id_servicio)}>
                                Añadir
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <h4>Servicios añadidos:</h4>
            <ul>
                {selectedServicios.map(({ id, data }) => {
                    const servicio = servicios.find(s => s.id_servicio === id);
                    return servicio ? (
                        <li key={id}>
                            {servicio.nombre}
                            <button type="button" onClick={() => handleRemoveServicio(id)}>Eliminar</button>
                            <ServiceFormRenderer
                                serviceId={id}
                                initialValues={data}
                                onFormChange={(formData) => handleFormChange(id, formData)}
                            />
                        </li>
                    ) : null;
                })}
            </ul>

            <button type="submit">{id ? "Guardar cambios" : "Crear visita"}</button>
        </form>
    );
};
