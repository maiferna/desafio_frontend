import React from 'react'

export const FilterByDate = () => {
  return (
        <div className="d-flex flex-wrap btn-group gap-2 mb-3 w-100" role="group" aria-label="Basic checkbox toggle button group">
            <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off"/>
            <label className="btn btn-light rounded-1 shadow-sm" htmlFor="btncheck3">⚠️ Urgente</label>

            <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"/>
            <label className="btn btn-light rounded-1 shadow-sm" htmlFor="btncheck1">Día</label>

            <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off"/>
            <label className="btn btn-light rounded-1 shadow-sm" htmlFor="btncheck2">Semana</label>

            <input type="checkbox" className="btn-check" id="btncheck4" autoComplete="off"/>
            <label className="btn btn-light rounded-1 shadow-sm" htmlFor="btncheck4">Mes</label>
        </div>
  )
}
