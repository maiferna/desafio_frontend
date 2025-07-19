// IMPORTS
import { Navigate, Route, Routes } from 'react-router'
import { LoginPage} from '../pages/publics'
import { SignupPage } from '../pages/admin'

// RUTAS
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Agrupar todas las rutas bajo un layout común */}
      {/*<Route path='/' element={<MainLayout />}>*/}

        {/* Rutas públicas */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />

      {/*</Route>*/}
    </Routes>
  )
}