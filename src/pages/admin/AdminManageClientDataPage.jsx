
import { HeaderHero } from '../../components/ui/HeaderHero'
import { EditClientForm } from '../../components/admin/Clients/EditClientForm'
import { CreateInstallationForm } from '../../components/admin/Clients/CreateInstallationForm'
import { InstallationList } from '../../components/admin/Installations/InstallationList'


export const AdminManageClientDataPage = ({id=1}) => {

  return (
    <main>
      <HeaderHero
        title={`Gestionar datos de ${id}`}
        subtitle="Añadir instalación"
      />
      <EditClientForm/>
      <InstallationList/>
      <CreateInstallationForm />
    </main>
  )
}