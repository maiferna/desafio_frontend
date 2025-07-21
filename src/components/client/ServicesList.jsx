import React from 'react'
import { ServiceRow } from './ServiceRow'

export const ServicesList = () => {
  return (
    <section className="p-5 pt-0 mb-5 container justify-content-center align-items-center">
        <h3 className="fw-bold pb-3">Historial de servicios</h3>
        <ul className="list-group">
          <li className="list-group-item"><ServiceRow/></li>
          <li className="list-group-item"><ServiceRow/></li>
          <li className="list-group-item"><ServiceRow/></li>
        </ul>
    </section>
  )
}
