import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { AdminServicesList } from '../../components/admin/AdminServicesList'
import { useNavigate } from 'react-router';


export const AdminManageServicesPage = () => {
    const navigate = useNavigate();
    return (
        <main className="my-5 pb-5">
            <HeaderHero
                title="Gestión de servicios"
                subtitle=""
            />
            <button onClick={() => navigate('/admin/manage-services-new')}>Nuevo servicio</button>
            <AdminServicesList />
        </main>
    )
}
