import React, { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';

export const ServiceFormRenderer = ({ serviceId, initialValues, onFormChange }) => {
    const [formDefinition, setFormDefinition] = useState(null);
    const [formState, setFormState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!serviceId) return;

        const loadService = async () => {
            setLoading(true);
            try {
                const response = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}services/${serviceId}`);
                const serviceData = response.data || response;
                setFormDefinition(serviceData.datos || {});

                const initialState = {};
                Object.entries(serviceData.datos || {}).forEach(([key, type]) => {
                    initialState[key] = type === 'bool' ? false : '';
                });

                const mergedState = { ...initialState, ...initialValues };
                setFormState(mergedState);
                onFormChange?.(mergedState); // initialize parent with merged state
            } catch (err) {
                setError(err.message || 'Failed to load service');
            } finally {
                setLoading(false);
            }
        };

        loadService();
    }, [serviceId]);

    const handleChange = (name, value) => {
        const newState = { ...formState, [name]: value };
        setFormState(newState);
        onFormChange?.(newState);
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
        </article>
    );
};
