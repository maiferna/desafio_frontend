import React, { useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';
import { useNavigate } from 'react-router';

export const NewService = () => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('text');
    const [fields, setFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState(''); //Msj éxito
    const navigate = useNavigate(); //Nav

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

        setSuccessMessage('✅ Servicio creado correctamente.'); // Msj éxito

        // Espera antes de redirigir
        setTimeout(() => {
            navigate('/admin/manage-services'); 
        }, 1500);
    };

    return (
        <section className="container d-flex flex-column align-items-center justify-content-center mb-5 pb-4 px-4">
            <form 
                className='w-100 my-4 p-4 px-4 border rounded-1'
                onSubmit={handleSubmit} 
                // style={{ maxWidth: 600, margin: '0 auto' }}
            >
                <h3 className="fw-bold mb-3">Campos en común</h3>

                <div className="mb-4">
                    <label htmlFor="serviceName" className="fw-bold form-label">Nombre del servicio:</label>
                    <input
                        className="form-control rounded-0"
                        type="text"
                        id="serviceName"
                        name="serviceName"
                        placeholder="Inserta un nombre"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="serviceDescription" className="fw-bold form-label">Descripción:</label>
                    <textarea
                        className="form-control rounded-0"
                        id="serviceDescription"
                        name="serviceDescription"
                        placeholder="Inserta una descripción del servicio"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>


                <h3 className="fw-bold mb-3">Campos únicos</h3>
                <h4 className="fw-bold mb-3 fs-6">Campos específicos de servicio:</h4>
                
                <div className="mb-4">
                    <input
                        className="form-control rounded-0"
                        type="text"
                        id="serviceField"
                        name="serviceField"
                        placeholder="Nombre del nuevo campo"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                    />
                    <select
                        className="form-select mt-2"
                        value={fieldType}
                        onChange={(e) => setFieldType(e.target.value)}
                    >
                        <option value="text">Tipo Texto</option>
                        <option value="bool">Tipo Booleano</option>
                        <option value="number">Tipo Número</option>
                    </select>
                    <button type="button" className="btn btn-light w-100 mt-2 rounded-1" onClick={handleAddField}>Añadir campo a servicio ➕</button>
                </div>

                <ul className="list-group mb-5 px-2">
                    {fields.map((field) => (
                        <li key={field.name} className="list-group-item d-flex justify-content-between align-items-center">
                            <div><strong>{field.name}</strong> ({field.type}){' '}</div>
                            <button 
                                className="btn btn-sm btn-outline-danger rounded-1 ms-5"
                                type="button" 
                                onClick={() => handleRemoveField(field.name)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>

                <button type="submit" className="btn btn-dark w-100 rounded-1">Guardar servicio</button>
                
                {successMessage && (
                    <div className="alert alert-success text-center w-100 mt-3" role="alert">
                        {successMessage}
                    </div>
                )}
            
            </form>
        </section>
    );
};
