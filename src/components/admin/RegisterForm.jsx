import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";

export const RegisterForm = ({ userToEdit, setUserToEdit }) => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const { formData, handleChange, resetInput, serializeForm, setFormData } = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
    id_cliente: ""
  });

  const [errors, setErrors] = useState({});

  // Obtener lista de clientes
  const { data: clients } = useFetch(`${urlBase}clients`);

  // Efecto para rellenar datos al editar
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.nombre || "",
        email: userToEdit.email || "",
        password: "",
        role: userToEdit.role || "",
        id_cliente: userToEdit.id_cliente || ""
      });
    }
  }, [userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formToSend = serializeForm();

    try {
      if (userToEdit) {
        // ACTUALIZAR USUARIO
        await fetchCall(
          `${urlBase}users/${userToEdit.id_usuario}`,
          "PUT",
          {},
          formToSend
        );
        setUserToEdit(null);
        resetInput();
      } else {
        // REGISTRAR USUARIO NUEVO
        await fetchCall(`${urlBase}auth/signup`, "POST", {}, formToSend);
      }
    } catch (error) {
      console.log('ERROR REGISTRO', error);
      if (error?.error) {
        setErrors(error.error);
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
            placeholder="Ingresa el nombre"
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
          <select
            className="form-control"
            name="role"
            id="registerRole"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Admin</option>
            <option value="tecnico">Técnico</option>
            <option value="cliente">Cliente</option>
          </select>
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
              {clients.map((client) => (
                <option key={client.id_cliente} value={client.id_cliente}>
                  {client.nombre}
                </option>
              ))}
            </select>
            {errors.id_cliente && <div className="text-danger">{errors.id_cliente.msg}</div>}
          </div>
        )}

        {/* Botón cancelar si estamos editando */}
        {userToEdit && (
          <button
            type="button"
            className="btn btn-secondary w-100 mb-2"
            onClick={() => {
              setUserToEdit(null);
              resetInput();
            }}
          >
            Cancelar edición
          </button>
        )}

        {/* Botón principal */}
        <button type="submit" className="btn btn-dark w-100 mt-2 mb-2">
          {userToEdit ? "Actualizar usuario" : "Registrarse"}
        </button>

        {/* Error general */}
        {errors.general && <p className="text-danger">{errors.general}</p>}
      </form>
    </section>
  );
};

