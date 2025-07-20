import { RegisterForm } from './RegisterForm'
import { HeaderHero } from '../../components/ui/HeaderHero'
import { WorkersList } from './WorkersList'


export const AdminManageWorkersPage = () => {
  return (
    <main>
      <HeaderHero
        title="Gestionar operarios"
        subtitle=""
      />

    <WorkersList/>
    </main>
  )
}