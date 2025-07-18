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
        <Route index element={<HomePage/>} />
        <Route path='/login' element={<LoginPage />} />

        {/* Rutas admin */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='/admin-dashboard'>
            <Route index element={<AdminDashboardPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Route>
        </Route>

        {/* Ruta por defecto: redirigir a Home si no encuentra nada */}
        <Route path='/*' element={<Navigate to='/' />} />

      {/*</Route>*/}
    </Routes>
  )
}