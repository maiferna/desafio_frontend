import React from 'react'

export const FilterByBar = () => {
  return (
    <article>
      <p className="fs-6 fw-bold">Filtros:</p>
      <div className="d-flex flex-wrap btn-group gap-2 mb-3 w-100" role="group" aria-label="Basic checkbox toggle button group">
        
        <input type="checkbox" className="btn-check" id="day" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="day"><i class="bi bi-calendar-event-fill"></i> Día</label>

        <input type="checkbox" className="btn-check" id="week" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="week"><i class="bi bi-calendar-week-fill"></i> Semana</label>

        <input type="checkbox" className="btn-check" id="month" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="month"><i class="bi bi-calendar-month-fill"></i> Mes</label>

        <input type="checkbox" className="btn-check" id="year" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="year"><i class="bi bi-calendar-fill"></i> Año</label>

        <input type="checkbox" className="btn-check" id="urgency" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="urgency"><i class="bi bi-exclamation-triangle-fill"></i> Urgentes</label>

        <input type="checkbox" className="btn-check" id="assigned" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="assigned">Asignadas</label>

        <input type="checkbox" className="btn-check" id="revised" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="revised">Revisadas</label>

        <input type="checkbox" className="btn-check" id="finished" autoComplete="off"/>
        <label className="btn btn-light rounded-1 shadow-sm" htmlFor="finished">Terminadas</label>
      </div>
    </article>
  )
}
