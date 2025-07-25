
import { Navigate, Route, Routes } from "react-router"
import { MainLayout } from "../components/ui/MainLayout"
import { HomePage, LoginPage } from "../pages/public"
import { ClientDashboardPage, ClientHireServicePage, ClientProfilePage } from "../pages/client"
import { WorkerCreateReportPage, WorkerDashboardPage, WorkerVisitDetailPage } from "../pages/worker"
import {
  AdminDashboardPage, AdminEditVisitPage, AdminManageClientsPage, AdminManageWorkersPage,
  AdminPlannerPage, AdminManageServicesPage, AdminEditServicePage, AdminNewServicePage,
  AdminManageVisitsPage, AdminCreateVisitPage
} from "../pages/admin"
import { AdminManageClientDataPage } from "../pages/admin/AdminManageClientDataPage"

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout común para todas las rutas */}
      <Route path='/' element={<MainLayout />}>

        {/* Rutas públicas */}
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/visit-detail' element={<WorkerVisitDetailPage />} />

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
          <Route path='make-report/:id' element={<WorkerCreateReportPage />} />

        </Route>
        {/* </Route> */}

        {/* Rutas admin (admin)*/}
        {/* <Route element={<PrivateRoute allowedRoles={['administrador']} />}> */}
        <Route path='/admin'>
          <Route index element={<AdminDashboardPage />} />
          <Route path='planner' element={<AdminPlannerPage />} />
          <Route path='manage-workers' element={<AdminManageWorkersPage />} />
          <Route path='manage-clients' element={<AdminManageClientsPage />} />
          <Route path='manage-clients/edit/:id' element={<AdminManageClientDataPage />} />
          <Route path='manage-services' element={<AdminManageServicesPage />} />
          <Route path='manage-services-new' element={<AdminNewServicePage />} />
          <Route path='manage-services-edit/:id' element={<AdminEditServicePage />} />
          <Route path='manage-visits' element={<AdminManageVisitsPage />} />
          <Route path='manage-visits-create' element={<AdminCreateVisitPage />} />
          <Route path='manage-visits-edit/:id' element={<AdminEditVisitPage />} />
        </Route>
        {/* </Route> */}

        {/* Redirección por defecto */}
        <Route path='/*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  );
};