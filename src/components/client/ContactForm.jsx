// import React, { useState } from "react";
// // import { useForm } from "../../hooks/useForm";
// // import { useUser } from "../../hooks/useUser";
// // import { fetchCall } from "../../utils/fetchCall";
// import { useNavigate } from "react-router";




// export const ContactForm = () => {

//   return (
//     <section className="container d-flex flex-column align-items-center justify-content-center my-5 py-4 px-4 pt-5">
//       <h2 className="fw-bold">Contacta con nosotros</h2>

//       <form className='w-100 my-4 pb-5 px-4'>{/* onSubmit={handleSubmit} */}
//         <div className="mb-3">
//           <label htmlFor="contactEmail" className="fw-bold form-label">*Email</label>
//           <input
//             type="email"
//             className="form-control rounded-0"
//             id="contactEmail"
//             name="email"
//             placeholder="Un email de contacto"
//             // value={}
//             // onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="contactName" className="fw-bold form-label">*Nombre</label>
//           <input
//             type="text"
//             className="form-control rounded-0"
//             id="contactName"
//             name="name"
//             placeholder="Personal o de empresa"
//             // value={}
//             // onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="contactMessage" className="fw-bold form-label">*Mensaje</label>
//           <textarea
//             type="message"
//             className="form-control rounded-0"
//             id="contactMessage"
//             name="message"
//             placeholder="En qué podemos ayudarle"
//             // value={}
//             // onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-dark w-100 mt-4 mb-5 rounded-1">
//             Enviar mensaje
//         </button>
//         {/* {error && <p className="text-danger">{error.message || String(error)}</p>} */}
//       </form>
//     </section>
//   )
// }
import { useState } from "react";
import { fetchCall } from "../../utils/fetchCall"; // Asegúrate que esté bien la ruta

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [feedback, setFeedback] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback(null);

    try {
      const response = await fetchCall(`${urlBase}contact`, "POST", {
        "Content-Type": "application/json"
      }, formData);

      if (response.ok) {
        setFeedback("¡Mensaje enviado con éxito!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFeedback(response.msg || "Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error al enviar formulario de contacto:", error);
      setFeedback("Error al enviar el mensaje.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 py-4 px-4 pt-5">
      <h2 className="fw-bold">Contacta con nosotros</h2>

      <form className="w-100 my-4 pb-5 px-4" onSubmit={handleSubmit}>
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
            required
          />
        </div>

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
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactMessage" className="fw-bold form-label">*Mensaje</label>
          <textarea
            className="form-control rounded-0"
            id="contactMessage"
            name="message"
            placeholder="En qué podemos ayudarle"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100 mt-4 mb-3 rounded-1"
          disabled={isSending}
        >
          {isSending ? "Enviando..." : "Enviar mensaje"}
        </button>

        {feedback && <p className="text-center fw-semibold">{feedback}</p>}
      </form>
    </section>
  );
};