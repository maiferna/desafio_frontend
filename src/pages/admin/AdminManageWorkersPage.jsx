
import { RegisterForm } from '../../components/admin/RegisterForm'
import { WorkersList } from '../../components/admin/WorkersList'
import { HeaderHero } from '../../components/ui/HeaderHero'



export const AdminManageWorkersPage = () => {
  return (
    <main>
      <HeaderHero
        title="Gestionar operarios"
        subtitle=""
      />
      <RegisterForm/>
    <WorkersList/>
    </main>
  )
}