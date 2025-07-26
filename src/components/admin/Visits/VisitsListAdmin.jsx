import React from 'react'
import { VisitRowAdmin } from './VisitRowAdmin'
import { FilterByBar } from '../../ui/FilterByBar'
import { useFetch } from '../../../hooks/useFetch'



export const VisitsListAdmin = ({ title = "title" }) => {
  const { data, loading, error, setData } = useFetch(`${import.meta.env.VITE_API_URL_BASE}visits`)
  console.log({ data })
  return (
    <section className="px-5 py-4 pt-0 mb-5 container justify-content-center align-items-center">
      <h3 className="fw-bold my-3 px-sm-1 px-md-0">Lista de visitas</h3>

      <FilterByBar />
      {data.map(visit => <VisitRowAdmin visit={visit} setData={setData} key={`visit-${visit.id_visita}`} />)}

    </section>
  )
}
