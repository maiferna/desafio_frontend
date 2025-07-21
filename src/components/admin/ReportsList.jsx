import React from 'react'
import { FilterByBar } from '../ui/FilterByBar'
import { ReportRow } from './ReportRow'


export const ReportsList = ({title="title"}) => {
  return (
    <section className="p-5 pt-0 mb-5 container justify-content-center align-items-center">
      <h3 className="fw-bold pb-3">{title}</h3>
      <FilterByBar/>
      <ul className="list-group">
        <li className="list-group-item"><ReportRow/></li>
        <li className="list-group-item"><ReportRow/></li>
        <li className="list-group-item"><ReportRow/></li>
      </ul>
    </section>
  )
}
