import React from 'react'
import { VisitRow } from './VisitRow'
import { FilterByBar } from '../ui/FilterByBar'

export const VisitsList = ({title="title"}) => {
  return (
    <section className="p-5 pt-0 mb-5 container justify-content-center align-items-center">
      <h3 className="fw-bold pb-3 mb-0 pb-0">{title}</h3>
      <FilterByBar/>
      <ul className="list-group">
        <li className="list-group-item"><VisitRow/></li>
        <li className="list-group-item"><VisitRow/></li>
        <li className="list-group-item"><VisitRow/></li>
      </ul>
    </section>
  )
}
