import { useState, useEffect } from 'react'
import { useForm } from '../../../hooks/useForm';
import { fetchCall } from '../../../utils/fetchCall';
import { useUser } from '../../../hooks/useUser';

export const CreateRouteForm = ({ setRoutes }) => {
    const { user } = useUser();
    const [allUsers, setAllUsers] = useState(null);
    const { formData, handleChange, resetInput, serializeForm } = useForm({
        tecnico_responsable: user.id || "",
        tecnico: "",
        tecnico_asistente: "",
        fecha: ""
    });

    const [errors, setErrors] = useState({});
    const urlBase = import.meta.env.VITE_API_URL_BASE;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await fetchCall(`${urlBase}users`);
                setAllUsers(users);
            } catch (err) {
                console.error("Error al obtener usuarios:", err);
            }
        };
        fetchUsers();
    }, []);

    if (!allUsers) return null
    const workers = allUsers.filter(user => user.role === 'tecnico');

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setErrors({});

        const formToSend = serializeForm();
        console.log('FORM TO SEND ROUTES', formToSend)

        try {
            const newRoute = await fetchCall(`${urlBase}routes`, "POST", {}, formToSend);
            resetInput();
            setRoutes(prev => [...prev, newRoute]);
        } catch (error) {
            console.log('Error al crear ruta', error);

            if (error?.error) {
                setErrors(error.error); // errores validados por campo
            } else {
                setErrors({ general: error.msg || "Error al crear nueva ruta" });
            }
        }
    };

    return (
        <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">
            <form className='w-100 my-3 px-4' onSubmit={handleSubmit} noValidate>

                {/* Tecnico responsable */}
                <div className="mb-3">
                    <label className="fw-bold form-label">Tecnico responsable</label>
                    <select
                        className="form-select"
                        name="tecnico_responsable"
                        value={formData.tecnico_responsable}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un responsable</option>
                        <option value={user.id}>
                            {user.name}
                        </option>
                    </select>
                    {errors.name && <div className="text-danger">{errors.name.msg}</div>}
                </div>

                {/* Técnico */}
                <div className="mb-3">
                    <label className="fw-bold form-label">Técnico</label>
                    <select
                        className="form-select"
                        name="tecnico"
                        value={formData.tecnico}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un técnico</option>
                        {workers.map(worker => (
                            <option key={worker.id_usuario} value={worker.id_usuario}>
                                {worker.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.email && <div className="text-danger">{errors.email.msg}</div>}
                </div>

                {/* Técnico asistente */}
                <div className="mb-3">
                    <label className="fw-bold form-label">Técnico asistente</label>
                    <select
                        className="form-select"
                        name="tecnico_asistente"
                        value={formData.tecnico_asistente}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un técnico asistente</option>
                        {workers
                            .filter(tecnico => tecnico.id_usuario !== formData.tecnico)
                            .map(tecnico => (
                                <option key={tecnico.id_usuario} value={tecnico.id_usuario}>
                                    {tecnico.nombre}
                                </option>
                            ))}
                    </select>
                    {errors.password && <div className="text-danger">{errors.tel.msg}</div>}
                </div>

                {/* Fecha */}
                <div className="mb-3">
                    <label className="fw-bold form-label">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                    />
                    {errors.role && <div className="text-danger">{errors.adress.msg}</div>}
                </div>

                <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">Crear nueva ruta</button>

                {/* Error general */}
                {errors.general && <p className="text-danger">{errors.general}</p>}
            </form>
        </section>
    );
}
