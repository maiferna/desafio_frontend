import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { AdminServiceRow } from './AdminServiceRow';



export const AdminServicesList = () => {
    const { data, loading, error, setData } = useFetch(`${import.meta.env.VITE_API_URL_BASE}services`)
    console.log(data)
    return (
        <section className='mb-5 pb-5 mx-5'>
        <h3 className="fw-bold my-4 px-sm-1 px-md-0">Lista de servicios</h3>
            
        <div className="d-flex row g-0 mb-5">
            {data.map(service => <AdminServiceRow service={service} setData={setData} key={service.nombre} />)}
        </div>
        </section>
    )
}