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
                subtitle="Revisión y creación de servicios"
            />

            <div className="d-flex justify-content-center">
                <button className="btn btn-dark btn-lg me-2 mb-5 rounded-1 px-4" onClick={() => navigate('/admin/manage-services-new')}>
                    Nuevo servicio <i className="bi bi-tools ms-2"></i> 
                </button>
            </div>

            <AdminServicesList />
        </main>
    )
}
