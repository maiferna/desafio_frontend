import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { AdminServiceRow } from './AdminServiceRow';

export const AdminServicesList = () => {
    const { data, loading, error, setData } = useFetch(`${import.meta.env.VITE_API_URL_BASE}services`)
    console.log(data)
    return (
        <div>ServicesList
            {data.map(service => <AdminServiceRow service={service} setData={setData} key={service.nombre} />)}

        </div>
    )
}
