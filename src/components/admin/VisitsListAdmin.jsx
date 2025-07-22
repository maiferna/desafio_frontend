import React from 'react'
import { FilterByBar } from '../ui/FilterByBar'
import { VisitRowAdmin } from './VisitRowAdmin'
import { useFetch } from '../../hooks/useFetch';

export const VisitsListAdmin = ({ title = "title" }) => {
  const { data, loading, error, setData } = useFetch(`${import.meta.env.VITE_API_URL_BASE}visits`)
  console.log({ data })
  return (
    <section className="px-5 py-4 pt-0 mb-5 container justify-content-center align-items-center">
      {/* <h3 className="fw-bold pb-3 mb-0 pb-0">{title}</h3> */}
      <FilterByBar />
      {data.map(visit => <VisitRowAdmin visit={visit} setData={setData} key={`visit-${visit.id_visita}`} />)}

    </section>
  )
}
