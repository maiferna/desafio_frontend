import { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { useUser } from "../../hooks/useUser";
import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";


export const SignupForm = () => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { register } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formToSend = serializeForm();

    try {
      // *******IMPORTANTE: CAMBIAR URL POR LA VÁLIDA*******
      const data = await fetchCall(`${urlBase}auth/signup`, "POST", {}, formToSend);

      // Guardar en contexto global
      register(data.user, data.token);

      // Redirigir según el role
      // *******IMPORTANTE: CAMBIAR URL POR LA VÁLIDA Y ROLES*******
      /* if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === 'client') {
        navigate("/client-dashboard");
      } else if (data.user.role === 'technician') {
        navigate('/technician-dashboard')
      } */
      navigate('/register')
    } catch (err) {
      setError(err.message || "Error al registrarse");
    }
  };


  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">

      <form className='w-100 my-3 px-4' onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="registerName" className="fw-bold form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="registerName"
            placeholder="Ingresa tu nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerEmail" className="fw-bold form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            placeholder="Ingresa un email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="fw-bold form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            placeholder="Ingresa una contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerRole" className="fw-bold form-label">Rol</label>
          <input
            type="text"
            className="form-control"
            id="registerRole"
            placeholder="Ingresa un rol"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        {/* TODO: Hacer fetch para obtener los clientes */}
        {/* {formData.role === 'cliente' && (
          <select name="id_cliente" onChange={handleChange}>
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        )} */}

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2"> Registrarse </button>
        {error && <p className="text-danger">{error.message}</p>}
      </form>
    </section>
  )
}