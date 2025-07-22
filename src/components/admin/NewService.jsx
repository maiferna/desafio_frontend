import React, { useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';

export const NewService = () => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('text');
    const [fields, setFields] = useState([]);

    const handleAddField = () => {
        if (!fieldName.trim()) return;
        if (fields.find(f => f.name === fieldName)) return;

        setFields([...fields, { name: fieldName, type: fieldType }]);
        setFieldName('');
        setFieldType('text');
    };

    const handleRemoveField = (nameToRemove) => {
        setFields(fields.filter(f => f.name !== nameToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonData = {};
        fields.forEach(field => {
            jsonData[field.name] = field.type;
        });

        await fetchCall(`${import.meta.env.VITE_API_URL_BASE}services`, "POST", {}, { nombre: serviceName, descripcion: description, datos: jsonData })
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2>Campos en comun</h2>

            <div>
                <label>Nombre del servicio:</label>
                <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Descripción:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <hr />

            <h3>Campos únicos</h3>

            <div style={{ display: 'flex', gap: '8px' }}>
                <input
                    type="text"
                    placeholder="Field name"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />
                <select
                    value={fieldType}
                    onChange={(e) => setFieldType(e.target.value)}
                >
                    <option value="text">Texto</option>
                    <option value="bool">Booleano</option>
                    <option value="number">Número</option>
                </select>
                <button type="button" onClick={handleAddField}>Add Field</button>
            </div>

            <ul>
                {fields.map((field) => (
                    <li key={field.name}>
                        <strong>{field.name}</strong> ({field.type}){' '}
                        <button type="button" onClick={() => handleRemoveField(field.name)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <button type="submit">Guardar servicio</button>
        </form>
    );
};
