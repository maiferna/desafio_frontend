import React from 'react'
import { NewService } from '../../components/admin/NewService'
import { HeaderHero } from '../../components/ui/HeaderHero'

export const AdminNewServicePage = () => {
    return (

        <main className="my-5 pb-5">
            <HeaderHero
                title="Gestión de servicios"
                subtitle="Crear servicio"
            />
            <NewService />
        </main>
    )
}
