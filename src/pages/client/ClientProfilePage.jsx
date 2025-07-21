import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { ClientProfileCard } from '../../components/client/ClientProfileCard'

export const ClientProfilePage = () => {
  return (
    <main>
      <HeaderHero
        title="Perfil de empresa"
        subtitle="Gestiona tus datos de empresa y contacto"
      />
      <ClientProfileCard/>
    </main>
  )
}