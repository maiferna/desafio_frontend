import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { CreateVisit } from '../../components/admin/CreateVisit'

export const AdminCreateVisitPage = () => {
    return (
        <main>
            <HeaderHero
                title="Gestión de visitas"
                subtitle="Crear visita"
            />
            <CreateVisit />
        </main>
    )
}
