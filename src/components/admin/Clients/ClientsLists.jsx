import React from 'react'
import { ClientRow } from './ClientRow'
import { useFetch } from '../../../hooks/useFetch'

export const ClientsList = ({clients, setClients}) => {
  // const { data, loading, error, setData } = useFetch(`${import.meta.env.VITE_API_URL_BASE}clients`)
  return (
    <section className='my-5 py-5 mx-5'>
        <h3 className="fw-bold my-4 px-sm-1 px-md-0">Lista de clientes</h3>
        <div>
            {clients.map(client => <ClientRow client={client} setClients={setClients} key={client.id_cliente} />)}
        </div>
    </section>
  )
}
