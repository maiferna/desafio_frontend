import React, { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';
import { ServiceFormRenderer } from './ServiceFormRenderer';

export const CreateVisit = () => {
    const [instalaciones, setInstalaciones] = useState([]);
    //   const [rutas, setRutas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [selectedInstalacion, setSelectedInstalacion] = useState('');
    const [selectedRuta, setSelectedRuta] = useState('');
    const [selectedServicios, setSelectedServicios] = useState([]);

    useEffect(() => {
        fetchCall(`${import.meta.env.VITE_API_URL_BASE}installations`).then(setInstalaciones);
        // fetchCall(`${import.meta.env.VITE_API_URL_BASE}rutas`).then(setRutas);
        fetchCall(`${import.meta.env.VITE_API_URL_BASE}services`).then(setServicios);
    }, []);

    const handleAddServicio = (id) => {
        if (!selectedServicios.includes(id)) {
            setSelectedServicios([...selectedServicios, id]);
        }
    };

    const handleRemoveServicio = (id) => {
        setSelectedServicios(selectedServicios.filter(sid => sid !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const visita = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits`, "POST", {}, {
            id_instalacion: selectedInstalacion,
            // id_ruta: selectedRuta,
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear nueva visita</h2>

            <label>Instalación:</label>
            <select onChange={e => setSelectedInstalacion(e.target.value)} value={selectedInstalacion}>
                <option value="">Seleccione una instalación</option>
                {instalaciones.map(inst => (
                    <option key={inst.id_instalacion} value={inst.id_instalacion}>
                        {inst.direccion}
                    </option>
                ))}
            </select>

            {/* <label>Ruta:</label>
      <select onChange={e => setSelectedRuta(e.target.value)} value={selectedRuta}>
        <option value="">Seleccione una ruta</option>
        {rutas.map(r => (
          <option key={r.id_ruta} value={r.id_ruta}>
            {r.nombre}
          </option>
        ))}
      </select> */}

            <h3>Servicios disponibles</h3>
            <ul>
                {servicios.map(s => (
                    <li key={s.id_servicio}>
                        {s.nombre}
                        <button type="button" onClick={() => handleAddServicio(s.id_servicio)}>
                            Añadir
                        </button>
                    </li>
                ))}
            </ul>

            <h4>Servicios añadidos:</h4>
            <ul>
                {selectedServicios.map(id => {
                    const servicio = servicios.find(s => s.id_servicio === id);
                    return (
                        <li key={id}>
                            {servicio?.nombre}
                            <button type="button" onClick={() => handleRemoveServicio(id)}>Eliminar</button>
                            <ServiceFormRenderer serviceId={servicio.id_servicio} />
                        </li>
                    );
                })}
            </ul>

            <button type="submit">Crear visita</button>
        </form>
    );
};
