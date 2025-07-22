import React, { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall'; // o la ruta donde tengas tu util

export const ServiceFormRenderer = ({ serviceId }) => {
    const [formDefinition, setFormDefinition] = useState(null); // datos del servicio
    const [formState, setFormState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!serviceId) return;

        const loadService = async () => {
            setLoading(true);
            try {
                const response = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}services/${serviceId}`);

                const serviceData = response.data || response; // por si tu backend no envuelve en { data: ... }
                setFormDefinition(serviceData.datos || {}); // solo nos interesa el campo `datos`

                // Inicializa el estado del formulario
                const initialState = {};
                Object.entries(serviceData.datos || {}).forEach(([key, type]) => {
                    initialState[key] = type === 'bool' ? false : ''; // booleans por defecto false
                });
                setFormState(initialState);
            } catch (err) {
                setError(err.message || 'Failed to load service');
            } finally {
                setLoading(false);
            }
        };

        loadService();
    }, [serviceId]);

    const handleChange = (name, value) => {
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form state:", formState);
        // Aquí haces fetch para crear ejecución_servicio, etc.
    };

    if (loading) return <p>Loading form...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <article>
            <h3>Service Form</h3>

            {Object.entries(formDefinition).map(([name, type]) => (
                <div key={name} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>{name}</label>

                    {type === 'text' && (
                        <input
                            type="text"
                            value={formState[name]}
                            onChange={(e) => handleChange(name, e.target.value)}
                        />
                    )}

                    {type === 'number' && (
                        <input
                            type="number"
                            value={formState[name]}
                            onChange={(e) => handleChange(name, Number(e.target.value))}
                        />
                    )}

                    {type === 'bool' && (
                        <input
                            type="checkbox"
                            checked={formState[name]}
                            onChange={(e) => handleChange(name, e.target.checked)}
                        />
                    )}
                </div>
            ))}

            <button onClick={handleSubmit}>Guardar datos</button>
        </article>
    );
};
