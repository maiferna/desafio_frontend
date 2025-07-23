import { useState } from 'react'
import { useNavigate } from "react-router";
import { useForm } from '../../../hooks/useForm';
import { fetchCall } from '../../../utils/fetchCall';


export const CreateClientForm = ({setClients}) => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    name: "",
    email: "",
    tel: "",
    adress: "",
    workType: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setErrors({});

    const formToSend = serializeForm();
    console.log('FORM TO SEND FRONT', formToSend)

    try {
      const newClient = await fetchCall(`${urlBase}clients`, "POST", {}, formToSend);
      resetInput();
      console.log('NEW CLIENT', newClient)
      setClients(prev => [...prev, newClient]);
    } catch (error) {
      console.log('Error CreateClientForm', error);

      if (error?.error) {
        setErrors(error.error); // errores validados por campo
      } else {
        setErrors({ general: error.msg || "Error al crear nuevo cliente" });
      }
    }
  };

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">
      <form className='w-100 my-3 px-4' onSubmit={handleSubmit} noValidate>

        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="name" className="fw-bold form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Personal o de empresa"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name.msg}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="fw-bold form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingresa un email de cliente"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email.msg}</div>}
        </div>

        {/* Teléfono */}
        <div className="mb-3">
          <label htmlFor="tel" className="fw-bold form-label">Teléfono de contacto</label>
          <input
            type="text"
            className="form-control"
            id="tel"
            placeholder="Ingresa un teléfono de contacto"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger">{errors.tel.msg}</div>}
        </div>

        {/* Adress */}
        <div className="mb-3">
          <label htmlFor="adress" className="fw-bold form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="adress"
            placeholder="Ingresa una dirección"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
          />
          {errors.role && <div className="text-danger">{errors.adress.msg}</div>}
        </div>

        {/* Tipo de actividad */}
        <div className="mb-3">
          <label htmlFor="workType" className="fw-bold form-label">Sector</label>
          <input
            type="text"
            className="form-control"
            id="workType"
            placeholder="Ingresa un sector"
            name="workType"
            value={formData.workType}
            onChange={handleChange}
          />
          {errors.role && <div className="text-danger">{errors.workType.msg}</div>}
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">Crear nuevo cliente</button>

        {/* Error general */}
        {errors.general && <p className="text-danger">{errors.general}</p>}
      </form>
    </section>
  );
};

