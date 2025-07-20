import React from 'react'
import { ClientRow } from './ClientRow'

export const ClientList = () => {
  return (
    <section className='my-5 py-5 mx-5'>
        <h3 className="fw-bold my-4 px-sm-1 px-md-0">Lista de clientes</h3>
        <div className="d-flex row g-0 mb-5">
            <ClientRow/>
            <ClientRow/>
            <ClientRow/>
        </div>
    </section>
  )
}
