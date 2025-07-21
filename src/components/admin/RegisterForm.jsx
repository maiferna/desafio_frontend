import { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { useUser } from "../../hooks/useUser";
import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";


export const RegisterForm = () => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
    id_cliente: ""
  });

  const { register, token } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formToSend = serializeForm();

    try {

      const data = await fetchCall(`${urlBase}auth/signup`, "POST", {}, formToSend, token);

      // Guardar en contexto global
      register(data.user, data.token);
      navigate('/register');
      // Redirigir según el role
      // *******IMPORTANTE: CAMBIAR URL POR LA VÁLIDA Y ROLES*******
      /* if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === 'client') {
        navigate("/client-dashboard");
      } else if (data.user.role === 'technician') {
        navigate('/technician-dashboard')
      } */

    } catch (error) {
      console.log('ERROR REGISTRO', error);

      if (error?.error) {
        setErrors(error.error); // errores validados por campo
      } else {
        setErrors({ general: error.msg || "Error al registrarse" });
      }
    }
  };

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">
      <form className='w-100 my-3 px-4' onSubmit={handleSubmit} noValidate>

        {/* Nombre */}
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
          {errors.name && <div className="text-danger">{errors.name.msg}</div>}
        </div>

        {/* Email */}
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
          {errors.email && <div className="text-danger">{errors.email.msg}</div>}
        </div>

        {/* Contraseña */}
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
          {errors.password && <div className="text-danger">{errors.password.msg}</div>}
        </div>

        {/* Rol */}
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
          {errors.role && <div className="text-danger">{errors.role.msg}</div>}
        </div>

        {/* Cliente (si rol === cliente) */}
        {formData.role === 'cliente' && (
          <div className="mb-3">
            <label htmlFor="id_cliente" className="fw-bold form-label">Cliente</label>
            <select
              className="form-control"
              name="id_cliente"
              id="id_cliente"
              value={formData.id_cliente}
              onChange={handleChange}
            >
              <option value="">Selecciona un cliente</option>
              {/* TODO */}
              {/* Aquí deberías cargar dinámicamente los clientes */}
              <option value="1">Cliente 1</option>
              <option value="2">Cliente 2</option>
            </select>
            {errors.id_cliente && <div className="text-danger">{errors.id_cliente.msg}</div>}
          </div>
        )}

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">Registrarse</button>

        {/* Error general */}
        {errors.general && <p className="text-danger">{errors.general}</p>}
      </form>
    </section>
  );
};