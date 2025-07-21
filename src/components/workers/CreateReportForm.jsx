import React from 'react'

export const CreateReportForm = () => {
  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 py-4 px-4 pt-5">
      <h2 className="fw-bold">Rellenar informe de visita</h2>

      <form className='w-100 my-4 pb-5 px-4'>{/* onSubmit={handleSubmit} */}
        <div className="mb-4">
          <label htmlFor="client" className="fw-bold form-label">Cliente</label>
          <input
            type="client"
            className="form-control rounded-0"
            id="client"
            name="client"
            placeholder="Cliente"
            // value={}
            // onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="serviceType" className="fw-bold form-label">Tipo de servicio</label>
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


        <div className="mb-4">
          <label htmlFor="checkpoints" className="fw-bold form-label">Nº de puntos de control</label>
          <input
            type="number"
            className="form-control rounded-0"
            id="checkpoints"
            name="checkpoints"
            defaultValue={10}
            // value={}
            // onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="client" className="fw-bold form-label">Tiempo de desempeño </label>
          <input
            type="client"
            className="form-control rounded-0"
            id="client"
            name="client"
            placeholder="En minutos"
            // value={}
            // onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workDetails" className="fw-bold form-label">Detalles de la visita</label>
          <textarea
            className="form-control rounded-0"
            id="workDetails"
            name="workDetails"
            placeholder="Otros datos a tener en cuenta sobre el trabajo realizado..."
            rows={5}
            // value={}
            // onChange={handleChange}
          />
        </div>

        <label className="fw-bold form-label">Nueva Visita</label>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
          <label className="form-check-label" htmlFor="checkDefault">
            Requiere nueva visita
          </label>
        </div>

        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
          <label className="form-check-label" htmlFor="checkDefault">
            Requiere más personal
          </label>
        </div>

        <div className="form-check mb-4">
          <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
          <label className="form-check-label" htmlFor="checkDefault">
            Requiere más medios
          </label>
        </div>


        <button type="submit" className="btn btn-dark w-100 mt-4 mb-5 rounded-1">
            Enviar mensaje
        </button>
        {/* {error && <p className="text-danger">{error.message || String(error)}</p>} */}
      </form>
    </section>
  )
}
