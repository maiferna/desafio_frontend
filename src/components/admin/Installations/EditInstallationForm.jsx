
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router";
import { useForm } from '../../../hooks/useForm';
import { fetchCall } from '../../../utils/fetchCall';

// TODO: modificar formulario para editar
export const EditInstallationForm = () => {
  // id de la instalación 
  const { id } = useParams();
  const { formData, setFormData, handleChange, resetInput } = useForm({
    name: "",
    adress: "",
    locality: "",
    checkpoints: "",
    imageUrl: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  useEffect(() => {
    const getInstallationData = async () => {
      try {
        const data = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}installations/${id}`);
        setFormData({
          name: data.nombre || "",
          adress: data.direccion || "",
          locality: data.localidad || "",
          checkpoints: data.puntos_control || "",
          imageUrl: data.image || ""
        });
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
    getInstallationData()
  }, [id])

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setErrors({});

    const dataToSend = new FormData();
    dataToSend.append("id", id);
    dataToSend.append("name", formData.name);
    dataToSend.append("adress", formData.adress);
    dataToSend.append("locality", formData.locality);
    dataToSend.append("checkpoints", formData.checkpoints);
    if (file) {
      dataToSend.append("image", file);
    } else {
      dataToSend.append("imageUrl", formData.imageUrl);
    }
    try {
      const res = await fetch(`${urlBase}installations/${id}`, { method: 'PUT', body: dataToSend });
      const data = await res.json();
      console.log("Instalación editada:", data);
      setFile(null)
    } catch (error) {
      console.log('Error al editar instalación', error);

      if (error?.error) {
        setErrors(error.error); // errores validados por campo
      } else {
        setErrors({ general: error.msg || "Error al editar instalación" });
      }
    }
  };

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">
      <form className='w-100 my-3 px-4' onSubmit={handleSubmit} noValidate>
        <input type="hidden" value={id} />
        <input type="hidden" name="imageUrl" value={formData.imageUrl} />
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

        {/* Localidad */}
        <div className="mb-3">
          <label htmlFor="locality" className="fw-bold form-label">Localidad</label>
          <input
            type="text"
            className="form-control"
            id="locality"
            placeholder="Ingresa una localidad"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.locality.msg}</div>}
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

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">Guardar cambios</button>

        {/* Error general */}
        {errors.general && <p className="text-danger">{errors.general}</p>}
      </form>
    </section>
  );
};