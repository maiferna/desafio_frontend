import { useState } from "react";
import { fetchCall } from "../../utils/fetchCall";
import { useForm } from "../../hooks/useForm";

export const ContactForm = () => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFeedback(null);
    setIsSending(true);

    const formToSend = serializeForm();

    try {
      const response = await fetchCall(`${urlBase}contact`, "POST", {}, formToSend);

      setFeedback("¡Mensaje enviado con éxito!");
      resetInput();
    } catch (error) {
      if (error?.error) {
        setErrors(error.error); // errores por campo
      } else {
        setErrors({ general: error.msg || "Error al enviar el mensaje" });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 py-4 px-4 pt-5">
      <h2 className="fw-bold">Contacta con nosotros</h2>

      <form className="w-100 my-4 pb-5 px-4" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="contactEmail" className="fw-bold form-label">*Email</label>
          <input
            type="email"
            className="form-control rounded-0"
            id="contactEmail"
            name="email"
            placeholder="Un email de contacto"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email.msg}</div>}
        </div>

        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="contactName" className="fw-bold form-label">*Nombre</label>
          <input
            type="text"
            className="form-control rounded-0"
            id="contactName"
            name="name"
            placeholder="Personal o de empresa"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name.msg}</div>}
        </div>

        {/* Mensaje */}
        <div className="mb-3">
          <label htmlFor="contactMessage" className="fw-bold form-label">*Mensaje</label>
          <textarea
            className="form-control rounded-0"
            id="contactMessage"
            name="message"
            placeholder="En qué podemos ayudarle"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <div className="text-danger">{errors.message.msg}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100 mt-4 mb-3 rounded-1"
          disabled={isSending}
        >
          {isSending ? "Enviando..." : "Enviar mensaje"}
        </button>

        {/* Errores generales o feedback */}
        {errors.general && (
          <p className="text-danger text-center">{errors.general}</p>
        )}

        {feedback && !Object.keys(errors).length && (
          <p className="text-success text-center fw-semibold">{feedback}</p>
        )}
      </form>
    </section>
  );
};
