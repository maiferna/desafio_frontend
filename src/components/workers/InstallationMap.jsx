import React, { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';

export const InstallationMap = ({ visit }) => {
    const [installation, setInstallation] = useState(null);
    const [controlPointGroups, setControlPointGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [points, setPoints] = useState([]);
    const [selectedPointIndex, setSelectedPointIndex] = useState(null);

    useEffect(() => {
        const visita = Array.isArray(visit) ? visit[0] : visit;
        if (!visita?.id_instalacion) return;

        const loadData = async () => {
            try {
                const { data: installationData } = await fetchCall(
                    `${import.meta.env.VITE_API_URL_BASE}installations/${visita.id_instalacion}`
                );
                setInstallation(installationData);

                const { data: groups } = await fetchCall(
                    `${import.meta.env.VITE_API_URL_BASE}control-point-groups`
                );
                setControlPointGroups(groups);

                const { data: savedPoints } = await fetchCall(
                    `${import.meta.env.VITE_API_URL_BASE}control-points/installation/${visita.id_instalacion}`
                );

                const mappedPoints = savedPoints.map(p => {
                    const group = groups.find(g => g.id_grupo_punto_control === p.id_grupo_punto_control);
                    const coords = JSON.parse(p.coordenadas);
                    return {
                        x: coords.x,
                        y: coords.y,
                        idGrupo: p.id_grupo_punto_control,
                        figura: group?.figura || '',
                    };
                });

                setPoints(mappedPoints);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadData();
    }, [visit]);

    const handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (selectedPointIndex !== null) {
            setSelectedPointIndex(null); // Unselect any selected point
            return;
        }

        if (!selectedGroup || !installation) return;

        setPoints(prev => [
            ...prev,
            {
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
        if (!points.length) {
            alert('No points to save');
            return;
        }

        const payloads = points.map(p => ({
            id_instalacion: installation.id_instalacion,
            id_grupo_punto_control: p.idGrupo,
            localizacion: '', // Optional
            coordenadas: { x: p.x, y: p.y }
        }));

        try {
            for (const payload of payloads) {
                await fetchCall(
                    `${import.meta.env.VITE_API_URL_BASE}control-points`,
                    "POST",
                    {},
                    payload
                );
            }

            alert("Control points saved successfully");
            setPoints([]);
        } catch (error) {
            console.error("Error saving control points:", error);
            alert("Error saving points");
        }
    };

    if (!installation) return <p>Loading map...</p>;

    return (
        <div>
            <h3>{installation.nombre}</h3>

            <div>
                <p><strong>Select a point group:</strong></p>
                {controlPointGroups.map(group => (
                    <button
                        key={group.id_grupo_punto_control}
                        onClick={() => setSelectedGroup(group)}
                        style={{
                            margin: '0 4px',
                            backgroundColor: selectedGroup?.id_grupo_punto_control === group.id_grupo_punto_control ? '#ddd' : '#fff',
                        }}
                    >
                        {group.nombre}
                    </button>
                ))}
            </div>
            <div style={{ margin: '10px 0' }}>
                <button onClick={handleSavePoints}>
                    Save points
                </button>
            </div>

            <div
                style={{ position: 'relative', display: 'inline-block' }}
                onClick={handleImageClick}
            >
                <img
                    src={`${import.meta.env.VITE_PUBLIC_URL_BASE}/uploads/${installation.image}`}
                    alt={`Plano de ${installation.nombre}`}
                    style={{ width: '100%', maxWidth: '800px', border: '1px solid #ccc' }}
                />

                {points.map((p, i) => (
                    <img
                        key={i}
                        src={`${import.meta.env.VITE_PUBLIC_URL_BASE}/${p.figura}`}
                        alt=""
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

        </div>
    );
};
