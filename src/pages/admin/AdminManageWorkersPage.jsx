import { RegisterForm } from './RegisterForm'
import { HeaderHero } from '../../components/ui/HeaderHero'



export const AdminManageWorkersPage = () => {
  return (
    <main>
      <HeaderHero
        title="Gestionar operarios"
        subtitle=""
      />

    <WorkersLis/>
    </main>
  )
}