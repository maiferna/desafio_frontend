import React from 'react'
import { RegisterForm } from '../../components/admin/RegisterForm'
import { HeaderHero } from '../../components/ui/HeaderHero'
/* import { CreateClientForm } from '../../components/admin/Clients/CreateClientForm' */

export const AdminWebUserRegister = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  return (
    <main>
      <HeaderHero
        title="Registrar usuario"
        subtitle="Añadir usuario web"
      />
      <RegisterForm userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
      {/* <CreateClientForm/> */}
    </main>
  )
}
