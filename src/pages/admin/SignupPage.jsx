import { SignupForm } from '../../auth/components/SignupForm'
import { HeaderHero } from '../../ui/components/HeaderHero'

export const SignupPage = () => {
  return (
    <main>
      <HeaderHero
        title="Signup"
        subtitle="join the community"
      />
      <SignupForm/>
    </main>
  )
}
