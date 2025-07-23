import React, { useState } from "react";
// import { useForm } from "../../hooks/useForm";
// import { useUser } from "../../hooks/useUser";
// import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";




export const HireServiceForm = () => {

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 py-4 px-4 pt-5">
      <h2 className="fw-bold text-center mt-5 pb-2 px-3">Contrata un nuevo servicio</h2>
      <p className="text-center px-4">Uno de nuestros especialista se pondrá en contacto con usted lo antes posible para analizar su solicitud y ofrecerle asesoramiento.</p>

      <form className='w-100 my-4 pb-5 px-4'>{/* onSubmit={handleSubmit} */}
        <div className="mb-3">
          <label htmlFor="contactName" className="fw-bold form-label">*Nombre</label>
          <input
            type="text"
            className="form-control rounded-0"
            id="contactName"
            name="name"
            placeholder="Personal o de empresa"
            // value={}
            // onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactEmail" className="fw-bold form-label">*Email</label>
          <input
            type="email"
            className="form-control rounded-0"
            id="contactEmail"
            name="email"
            placeholder="Un email de contacto"
            // value={}
            // onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="serviceType" className="fw-bold form-label">*Tipo de servicio</label>
          <select
              aria-label="Selecciona el tipo de servicio"
              className="form-select mt-2"
              id="serviceType"
              name="serviceType"
              // value={}
              // onChange={handleChange}
          >
            <option value="">Elige uno</option>
            <option value="legionela">Legionela</option>
            <option value="plagas">Plagas</option>
            <option value="cucarachas">Cucarachos</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="contactMessage" className="fw-bold form-label">*Mensaje</label>
          <textarea
            type="message"
            className="form-control rounded-0"
            id="contactMessage"
            name="message"
            placeholder="Cuéntanos más detales sobre tu problema"
            // value={}
            // onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-5 rounded-1">
          Consultar sobre servicio
        </button>
        {/* {error && <p className="text-danger">{error.message || String(error)}</p>} */}
        
      </form>
    </section>
  )
}