import { LoginForm } from "../../auth/components/LoginForm"
import { HeaderHero } from "../../ui/components/HeaderHero"


export const LoginPage = () => {
  return (
    <main>      
      <HeaderHero
        title="Inicia sesión"
      />
      <LoginForm/>
    </main>
  )
}