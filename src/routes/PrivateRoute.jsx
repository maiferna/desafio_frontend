// USAR CUANDO SE CONFIRME EL USER CONTEXT PARA EL BLOQUEO DE RUTAS POR TIPO DE USUARIO
// DES-COMENTAR EN "AppRoutes": {/* <Route element={<PrivateRoute allowedRoles={['cliente']} />}> */}



// import { Navigate, Outlet } from 'react-router'
// import { useUser } from '../contexts/userContext'


// export const PrivateRoute = ({ allowedRoles }) => {
//   const { user } = useUser()

//   if (!user) {
//     // No está logueado: redirige a login
//     return <Navigate to="/login" replace />
//   }

//   if (!allowedRoles.includes(user.role)) {
//     // Rol no permitido: redirige a una página de "No autorizado" o al home
//     return <Navigate to="/" replace />
//   }

//   // Usuario válido y rol permitido, renderiza la ruta
//   return <Outlet />
// }