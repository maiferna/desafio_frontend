import { LoginForm } from "../../components/auth/LoginForm"
import { HeaderHero } from "../../components/ui/HeaderHero"



export const LoginPage = () => {
  return (
    <main>      
      <HeaderHero
        title="Login"
        subtitle="Entra con tu identificación en Plaguatec"
      />
      <LoginForm/>
    </main>
  )
}
