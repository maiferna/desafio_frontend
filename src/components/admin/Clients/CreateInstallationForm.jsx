import { useState } from 'react'
import { useNavigate } from "react-router";
import { useForm } from '../../../hooks/useForm';
import { fetchCall } from '../../../utils/fetchCall';


export const CreateInstallationForm = () => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    name: "",
    adress: "",
    coord: "",
    checkpoints: "",
    details: "",
    image: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formToSend = serializeForm();

    try {
      const data = await fetchCall(`${urlBase}installations`, "POST", {}, formToSend);
      resetInput();

    } catch (error) {
      console.log('Error CreateInstallationForm', error);

      if (error?.error) {
        setErrors(error.error); // errores validados por campo
      } else {
        setErrors({ general: error.msg || "Error al crear nueva instalación" });
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

        {/* Adress */}
        <div className="mb-3">
          <label htmlFor="adress" className="fw-bold form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="adress"
            placeholder="Ingresa una dirección"
            name="adress"
            value={formData.role}
            onChange={handleChange}
          />
          {errors.role && <div className="text-danger">{errors.adress.msg}</div>}
        </div>

        {/* Coordenadas */}
        <div className="mb-3">
          <label htmlFor="coord" className="fw-bold form-label">Coordenadas</label>
          <input
            type="text"
            className="form-control"
            id="coord"
            placeholder="Ingresa unas coordenadas"
            name="coord"
            value={formData.coord}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.coord.msg}</div>}
        </div>

        {/* Puntos de control */}
        <div className="mb-3">
          <label htmlFor="checkpoints" className="fw-bold form-label">Cantidad de puntos de control</label>
          <input
            type="number"
            className="form-control rounded-0"
            id="checkpoints"
            name="checkpoints"
            value={formData.checkpoints}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger">{errors.tel.msg}</div>}
        </div>

        {/* Detalles */}
        <div className="mb-4">
          <label htmlFor="installationDetails" className="fw-bold form-label">Detalles sobre la instalación</label>
          <textarea
            className="form-control rounded-0"
            id="installationDetails"
            name="installationDetails"
            placeholder="Detalles a tener en cuenta sobre la instalación..."
            rows={5}
            value={formData.installationDetails}
            onChange={handleChange}
          />
        </div>

        {/* Imagen */}
        <div className="mb-3">
          <label htmlFor="installationImg" className="fw-bold form-label">Plano de la instalación</label>
          <input
            type="file"
            className="form-control"
            id="installationImg"
            placeholder="Ingresa el plano de la localización"
            name="installationImg"
            value={formData.installationImg}
            onChange={handleChange}
          />
          {errors.role && <div className="text-danger">{errors.installationImg.msg}</div>}
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">Crear nuevo cliente</button>

        {/* Error general */}
        {errors.general && <p className="text-danger">{errors.general}</p>}
      </form>
    </section>
  );
};