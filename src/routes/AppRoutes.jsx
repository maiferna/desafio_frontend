import { Navigate, Route, Routes } from "react-router"
import { MainLayout } from "../components/ui/MainLayout"
import { HomePage, LoginPage } from "../pages/public"
import { ClientDashboardPage, ClientHireServicePage, ClientProfilePage } from "../pages/client"
import { WorkerCreateReportPage, WorkerDashboardPage, WorkerVisitDetailPage } from "../pages/worker"
import { AdminDashboardPage, AdminEditVisitPage, AdminManageClientsPage, AdminManageWorkersPage, AdminPlannerPage } from "../pages/admin"

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Agrupar todas las rutas bajo un layout común */}
      <Route path='/' element={<MainLayout />}>

        {/* Rutas públicas */}
        <Route index element={<HomePage/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='visit-detail' element={<WorkerVisitDetailPage />} />

        {/* Rutas cliente (privadas) */}
        {/* <Route element={<PrivateRoute allowedRoles={['cliente']} />}> */}
          <Route path="/client">
            <Route index element={<ClientDashboardPage />} />
            <Route path='hire-service' element={<ClientHireServicePage />} />
            <Route path='profile' element={<ClientProfilePage />} />
          </Route>
        {/* </Route> */}

        {/* Rutas worker (worker)*/}
        {/* <Route element={<PrivateRoute allowedRoles={['operario']} />}> */}
          <Route path='/worker'>
            <Route index element={<WorkerDashboardPage />} />
            <Route path='make-report' element={<WorkerCreateReportPage />} />
          </Route>
        {/* </Route> */}

        {/* Rutas admin (admin)*/}
        {/* <Route element={<PrivateRoute allowedRoles={['administrador']} />}> */}
          <Route path='/admin'>
            <Route index element={<AdminDashboardPage />} />
            <Route path='planner' element={<AdminPlannerPage />} />
            <Route path='edit-visit' element={<AdminEditVisitPage />} />
            <Route path='manage-workers' element={<AdminManageWorkersPage />} />
            <Route path='manage-clients' element={<AdminManageClientsPage />} />
          </Route>
        {/* </Route> */}

        {/* Ruta por defecto: redirigir a Home si no encuentra nada */}
        <Route path='/*' element={<Navigate to='/' />} />

      </Route>
    </Routes>
  )
}