import React, { useState }  from 'react'


export const RegisterForm = () => {
  
  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">

      <form className='w-100 my-3 px-4'> {/* onSubmit={handleSubmit} */}
        <div className="mb-3">
          <label htmlFor="registerName" className="fw-bold form-label">*Nombre de cliente</label>
          <input
            type="text"
            className="form-control rounded-0"
            id="registerName"
            placeholder="Personal o de empresa"
            name="name"
            // value={ formData.name }
            // onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerEmail" className="fw-bold form-label">*Email</label>
          <input
            type="email"
            className="form-control rounded-0"
            id="registerEmail"
            placeholder="Asignar un email"
            name="email"
            // value={ formData.email }
            // onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="fw-bold form-label">*Contraseña</label>
          <input
            type="password"
            className="form-control rounded-0"
            id="registerPassword"
            placeholder="Asignar contraseña"
            name="password"
            // value={ formData.password } 
            // onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="activity" className="fw-bold form-label">Tipo de actividad</label>
          <input
            type="text"
            className="form-control rounded-0"
            id="activity"
            placeholder="Tipo de empresa"
            name="password"
            // value={ formData.password } 
            // onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="clientDetails" className="fw-bold form-label">Información adicional</label>
          <textarea
            className="form-control rounded-0"
            id="clientDetails"
            name="clientDetails"
            placeholder="Otros datos de cliente (tfn, dirección...)"
            rows={5}
            // value={}
            // onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2"> Registrar nuevo cliente</button>
          {/* {error && <p className="text-danger">{error.message || String(error)}</p>} */}
      </form>
      
    </section>
  )
}