import React, { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';

export const InstallationMap = ({ visit }) => {
    const [installation, setInstallation] = useState(null);
    const [controlPointGroups, setControlPointGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [points, setPoints] = useState([]);
    const [selectedPointIndex, setSelectedPointIndex] = useState(null);
    const [history, setHistory] = useState([]);
    const [states, setStates] = useState([]);
    const [firstExecution, setFirstExecution] = useState(null);


    useEffect(() => {
        const visita = Array.isArray(visit) ? visit[0] : visit;
        if (!visita?.id_instalacion) return;

        const loadData = async () => {
            try {
                const { data: installationData } = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}installations/${visita.id_instalacion}`);
                setInstallation(installationData);

                const { data: groups } = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}control-point-groups`);
                setControlPointGroups(groups);

                const { data: savedPoints } = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}control-points/installation/${visita.id_instalacion}`);

                const mappedPoints = savedPoints?.map(p => {
                    const group = groups.find(g => g.id_grupo_punto_control === p.id_grupo_punto_control);
                    const coords = JSON.parse(p.coordenadas);
                    return {
                        id_punto_control: p.id_punto_control,
                        x: coords.x,
                        y: coords.y,
                        idGrupo: p.id_grupo_punto_control,
                        figura: group?.figura || '',
                    };
                });
                setPoints(mappedPoints);

                if (visita.id_visita) {
                    const historyData = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}control-point-state-history/visit/${visita.id_visita}`);
                    setHistory(historyData);

                    const executions = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}service-executions/visit/${visita.id_visita}`);
                    if (Array.isArray(executions) && executions[0]) {
                        setFirstExecution(executions[0]);
                    }
                }

                const statesData = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}control-point-states`);
                setStates(statesData);

            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadData();
    }, [visit]);

    const getLastHistoryForPoint = (pointId) => {
        const pointHistory = history
            .filter(h => h.id_punto_control === pointId)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        return pointHistory.length ? pointHistory[0] : null;
    };

    const handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (selectedPointIndex !== null) {
            setSelectedPointIndex(null);
            return;
        }

        if (!selectedGroup || !installation) return;

        setPoints(prev => [
            ...prev,
            {
                id_punto_control: null,
                x,
                y,
                figura: selectedGroup.figura,
                idGrupo: selectedGroup.id_grupo_punto_control,
            },
        ]);
    };

    const handlePointClick = (e, index) => {
        e.stopPropagation();

        if (selectedPointIndex === index) {
            const action = prompt("Enter group ID to change, or type 'delete':");

            if (action === 'delete') {
                setPoints(prev => prev.filter((_, i) => i !== index));
                setSelectedPointIndex(null);
            } else {
                const newGroup = controlPointGroups.find(g => g.id_grupo_punto_control === Number(action));
                if (newGroup) {
                    setPoints(prev => {
                        const updated = [...prev];
                        updated[index] = {
                            ...updated[index],
                            figura: newGroup.figura,
                            idGrupo: newGroup.id_grupo_punto_control,
                        };
                        return updated;
                    });
                    setSelectedPointIndex(null);
                }
            }
        } else {
            setSelectedPointIndex(index);
        }
    };

    const handleSavePoints = async () => {
        if (!points.length) return alert('No points to save');
        const visita = Array.isArray(visit) ? visit[0] : visit;

        try {
            for (const p of points) {
                let pointId = p.id_punto_control;

                // Si el punto ya existe, actualizamos (PUT)
                if (pointId) {
                    const payload = {
                        id_instalacion: installation.id_instalacion,
                        id_grupo_punto_control: p.idGrupo,
                        localizacion: '',
                        coordenadas: { x: p.x, y: p.y }
                    };

                    await fetchCall(
                        `${import.meta.env.VITE_API_URL_BASE}control-points/${pointId}`,
                        "PUT",
                        {},
                        payload
                    );
                } else {
                    // Si el punto no existe, lo creamos (POST)
                    const payload = {
                        id_instalacion: installation.id_instalacion,
                        id_grupo_punto_control: p.idGrupo,
                        localizacion: '',
                        coordenadas: { x: p.x, y: p.y }
                    };

                    const createdPoint = await fetchCall(
                        `${import.meta.env.VITE_API_URL_BASE}control-points`,
                        "POST",
                        {},
                        payload
                    );
                    pointId = createdPoint.id_punto_control;

                    // Creamos el histórico inicial
                    await fetchCall(`${import.meta.env.VITE_API_URL_BASE}control-point-state-history`, "POST", {}, {
                        id_punto_control: pointId,
                        id_ejecucion_servicio: firstExecution.id_ejecucion_servicio,
                        id_estado_punto_control: 1,
                        fecha: new Date().toISOString(),
                    });
                }
            }

            alert("Points and history saved successfully");
            setPoints([]); // Opcional: podrías recargar en vez de vaciar
        } catch (error) {
            console.error("Error saving points or history:", error);
            alert("Error saving");
        }
    };

    const handleStateChange = async (pointId, newStateId) => {
        if (!firstExecution) return;
        try {
            const visita = Array.isArray(visit) ? visit[0] : visit;

            // Buscamos si ya existe un histórico para ese punto en esa ejecución
            const existingHistory = history.find(
                h => h.id_punto_control === pointId && h.id_ejecucion_servicio === firstExecution.id_ejecucion_servicio
            );

            if (existingHistory) {
                // Si existe, actualizamos (PUT)
                await fetchCall(
                    `${import.meta.env.VITE_API_URL_BASE}control-point-state-history/${existingHistory.id_historial_estado_punto_control}`,
                    "PUT",
                    {},
                    {
                        id_punto_control: pointId,
                        id_ejecucion_servicio: firstExecution.id_ejecucion_servicio,
                        id_estado_punto_control: Number(newStateId),
                        fecha: new Date().toISOString(),
                    }
                );
            } else {
                // Si no existe, lo creamos (POST)
                await fetchCall(`${import.meta.env.VITE_API_URL_BASE}control-point-state-history`, "POST", {}, {
                    id_punto_control: pointId,
                    id_ejecucion_servicio: firstExecution.id_ejecucion_servicio,
                    id_estado_punto_control: Number(newStateId),
                    fecha: new Date().toISOString(),
                });
            }

            // Recargamos historial para que UI esté actualizada
            const updatedHistory = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}control-point-state-history/visit/${visita.id_visita}`);
            setHistory(updatedHistory);
        } catch (error) {
            console.error("Error updating point state:", error);
            alert("Error updating state");
        }
    };

    if (!installation) return <p>Loading map...</p>;

    return (
        <div>
            <h3 className="fw-bold fs-4 mt-5">{installation.nombre}</h3>

            <div>
                <p><strong>Selecciona un grupo de puntos de control</strong></p>
                {controlPointGroups.map(group => (
                    <button
                        className="btn btn-outline-dark me-2"
                        key={group.id_grupo_punto_control}
                        onClick={() => setSelectedGroup(group)}
                    >
                        {group.nombre}
                    </button>
                ))}
            </div>

            <div style={{ margin: '10px 0' }}>
                <button className="btn btn-dark me-2" onClick={handleSavePoints}>
                    Guardar puntos de control
                </button>
            </div>

            <div
                style={{ position: 'relative', display: 'inline-block' }}
                onClick={handleImageClick}
            >
                <img
                    src={`${import.meta.env.VITE_PUBLIC_URL_BASE}/${installation.image}`}
                    alt={`Plano de ${installation.nombre}`}
                    style={{ width: '100%', maxWidth: '800px', border: '1px solid #ccc' }}
                />

                {points.map((p, i) => (
                    <img
                        key={i}
                        src={`${import.meta.env.VITE_PUBLIC_URL_BASE}/${p.figura}`}
                        alt=""
                        color='#28a745'
                        style={{
                            position: 'absolute',
                            left: p.x,
                            top: p.y,
                            width: selectedPointIndex === i ? 32 : 24,
                            height: selectedPointIndex === i ? 32 : 24,
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'auto',
                            border: selectedPointIndex === i ? '2px solid red' : 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                        }}
                        onClick={(e) => handlePointClick(e, i)}
                    />
                ))}
            </div>

            {selectedPointIndex !== null && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #aaa' }}>
                    <h4>Selected Control Point</h4>
                    <p><strong>Group:</strong> {
                        controlPointGroups.find(g => g.id_grupo_punto_control === points[selectedPointIndex].idGrupo)?.nombre || 'Unknown'
                    }</p>
                    <p><strong>Coordinates:</strong> x: {Math.round(points[selectedPointIndex].x)}, y: {Math.round(points[selectedPointIndex].y)}</p>
                </div>
            )}

            <h4 className="fw-bold fs-5 mt-5 mb-3">Puntos de control y su estado:</h4>
            <table className="table table-bordered table-hover align-middle text-center">
                <thead>
                    <tr>
                        <th>Id de punto de control</th>
                        <th>Grupo</th>
                        <th>Coordenadas (x, y)</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((point, idx) => {
                        const lastHistory = getLastHistoryForPoint(point.id_punto_control);
                        const groupName = controlPointGroups.find(g => g.id_grupo_punto_control === point.idGrupo)?.nombre || 'Unknown';
                        return (
                            <tr key={idx}>
                                <td>{point.id_punto_control ?? 'New'}</td>
                                <td>{groupName}</td>
                                <td>{`${Math.round(point.x)}, ${Math.round(point.y)}`}</td>
                                <td>
                                    {point.id_punto_control && lastHistory ? (
                                        <select
                                            value={lastHistory.id_estado || 1}
                                            onChange={(e) => handleStateChange(point.id_punto_control, e.target.value)}
                                        >
                                            {states.map(state => (
                                                <option key={state.id_estado_punto_control} value={state.id_estado_punto_control}>
                                                    {state.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        'No history'
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
