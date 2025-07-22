import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { useNavigate } from 'react-router';
import { VisitsListAdmin } from '../../components/admin/VisitsListAdmin';

export const AdminManageVisitsPage = () => {
    const navigate = useNavigate();
    return (
        <main>
            <HeaderHero
                title="Gestión de visitas"
                subtitle=""
            />
            <button onClick={() => navigate('/admin/manage-visits-create')}>Nueva visita</button>
            <VisitsListAdmin />
        </main>
    )
}
