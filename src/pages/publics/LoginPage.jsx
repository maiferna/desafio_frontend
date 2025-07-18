import { LoginForm } from "../../auth/components/LoginForm"
import { HeaderHero } from "../../ui/components/HeaderHero"


export const LoginPage = () => {
  return (
    <main>      
      <HeaderHero
        title="Login"
        subtitle="into your account :)"
      />
      <LoginForm/>
    </main>
  )
}