import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { useNavigate } from 'react-router';
import { VisitsListAdmin } from '../../components/admin/Visits/VisitsListAdmin';


export const AdminManageVisitsPage = () => {
    const navigate = useNavigate();
    return (
        <main className="my-5 pb-5">
            <HeaderHero
                title="Gestión de visitas"
                subtitle=""
            />

            <div className="d-flex justify-content-center">
                <button className="btn btn-dark btn-lg me-2 mb-5 rounded-1" onClick={() => navigate('/admin/manage-visits-create')}>
                    Nueva visita <i class="bi bi-house-door"></i> 
                </button>
            </div>

            <VisitsListAdmin />
        </main>
    )
}
