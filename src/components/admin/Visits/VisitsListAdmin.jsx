import React from 'react'

import { VisitRowAdmin } from './VisitRowAdmin'
import { FilterByBar } from '../../ui/FilterByBar'


export const VisitsListAdmin = ({title="title"}) => {
  return (
    <section className="px-5 py-4 pt-0 mb-5 container justify-content-center align-items-center">
      <h3 className="fw-bold pb-3 mb-0 pb-0">{title}</h3>
      <FilterByBar/>
      <ul className="list-group">
        <li className="list-group-item"><VisitRowAdmin/></li>
        <li className="list-group-item"><VisitRowAdmin/></li>
        <li className="list-group-item"><VisitRowAdmin/></li>
      </ul>
    </section>
  )
}
