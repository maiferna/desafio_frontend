import React from 'react'
import { RegisterForm } from '../../components/admin/RegisterForm'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { CreateClientForm } from '../../components/admin/Clients/CreateClientForm'

export const AdminWebUserRegister = () => {
  return (
    <main>
      <HeaderHero
        title="Registrar usuario"
        subtitle="Añadir usuario web"
      />
      <CreateClientForm/>
    </main>
  )
}
