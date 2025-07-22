
import { HeaderHero } from '../../components/ui/HeaderHero'
import { EditClientForm } from '../../components/admin/Clients/EditClientForm'
import { CreateInstallationForm } from '../../components/admin/Clients/CreateInstallationForm'
import { InstallationList } from '../../components/admin/Installations/InstallationList'
import { useParams } from 'react-router'
import { useFetch } from '../../hooks/useFetch'


export const AdminManageClientDataPage = () => {
  const {id} = useParams();
  return (
    <main>
      <HeaderHero
        title={`Gestionar datos`}
        /* subtitle="Añadir instalación" */
      />
      <EditClientForm id={id}/>
      <InstallationList/>
      <CreateInstallationForm />
    </main>
  )
}