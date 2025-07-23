import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { EditService } from '../../components/admin/EditService';
import { useParams } from 'react-router';

export const AdminEditServicePage = () => {
    const { id } = useParams();
    return (
        <main className="my-5 pb-5">
            <HeaderHero
                title="Gestión de servicios"
                subtitle="Editar servicio"
            />
            <EditService id={id} />
        </main>
    )
}
