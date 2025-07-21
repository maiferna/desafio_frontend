import React from 'react'

import { HeaderHero } from '../../components/ui/HeaderHero'
import { ClientsList } from '../../components/admin/ClientsLists'
import { RegisterForm } from '../../components/admin/RegisterForm'


export const AdminManageClientsPage = () => {
  return (
    <main>
      <HeaderHero
        title="Gestionar clientes"
        subtitle="Registro de nuevo cliente"
      />
      <RegisterForm />

      <ClientsList />
    </main>
  )
}