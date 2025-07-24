import { useState } from 'react'
import { useNavigate } from "react-router";
import { useForm } from '../../../hooks/useForm';
import { fetchCall } from '../../../utils/fetchCall';


export const CreateInstallationForm = ({ id, setInstallations }) => {
  const { formData, handleChange, resetInput } = useForm({
    name: "",
    adress: "",
    latitude: "",
    longitude: "",
    checkpoints: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setErrors({});

    const dataToSend = new FormData();
    dataToSend.append("id", id);
    dataToSend.append("name", formData.name);
    dataToSend.append("adress", formData.adress);
    dataToSend.append("latitude", formData.latitude);
    dataToSend.append("longitude", formData.longitude);
    dataToSend.append("checkpoints", formData.checkpoints);
    if (file) {
      dataToSend.append("image", file);
    }
/* TODO: revisar estas dos llamadas */
    try {
      const res = await fetch(`${urlBase}installations`, { method: 'POST', body: dataToSend });
      const data = await res.json();
      console.log("Instalación creada:", data);
      const updatedRes = await fetch(`${urlBase}installations/client/${id}`);
      const updatedInstallations = await updatedRes.json();
      resetInput();
      setFile(null)
      setInstallations(updatedInstallations);
    } catch (error) {
      console.log('Error al crear nueva instalación', error);

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
        <input type="hidden" value={id} />
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
            value={formData.adress}
            onChange={handleChange}
          />
          {errors.role && <div className="text-danger">{errors.adress.msg}</div>}
        </div>

        {/* Latitud */}
        <div className="mb-3">
          <label htmlFor="latitude" className="fw-bold form-label">Latitud</label>
          <input
            type="text"
            className="form-control"
            id="latitude"
            placeholder="Ingresa una latitud"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.latitude.msg}</div>}
        </div>

        {/* Longitud */}
        <div className="mb-3">
          <label htmlFor="longitude" className="fw-bold form-label">Longitud</label>
          <input
            type="text"
            className="form-control"
            id="longitude"
            placeholder="Ingresa una longitud"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.longitude.msg}</div>}
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

        {/* Imagen */}
        <div className="mb-3">
          <label htmlFor="image" className="fw-bold form-label">Plano de la instalación</label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Ingresa el plano de la localización"
            name="image"
            onChange={(ev) => setFile(ev.target.files[0])}
          />
          {errors.role && <div className="text-danger">{errors.image.msg}</div>}
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">Crear nueva instalación</button>

        {/* Error general */}
        {errors.general && <p className="text-danger">{errors.general}</p>}
      </form>
    </section>
  );
};