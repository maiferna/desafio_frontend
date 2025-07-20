import React from 'react'
import { RegisterForm } from './RegisterForm'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { ClientList } from './ClientGrid'


export const AdminManageClientsPage = () => {
  return (
    <main>
      <HeaderHero
        title="Gestionar clientes"
        subtitle="Registro de nuevo cliente"
      />
      <RegisterForm/>

    <ClientList/>
    </main>
  )
}