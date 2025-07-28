import { Navigate, Route, Routes } from "react-router";
import { MainLayout } from "../components/ui/MainLayout";

// Páginas públicas
import { HomePage, LoginPage } from "../pages/public";

// Páginas cliente
import { ClientDashboardPage, ClientHireServicePage, ClientProfilePage } from "../pages/client";

// Páginas técnico
import { WorkerCreateReportPage, WorkerDashboardPage, WorkerVisitDetailPage } from "../pages/worker";

// Páginas admin
import {
  AdminDashboardPage, AdminEditVisitPage, AdminManageClientsPage, AdminManageWorkersPage,
  AdminPlannerPage, AdminManageServicesPage, AdminEditServicePage, AdminNewServicePage,
  AdminManageVisitsPage, AdminCreateVisitPage
} from "../pages/admin";

// Protección de rutas
import { PrivateRoute } from "./PrivateRoute";
import { AdminManageClientDataPage } from "../pages/admin/AdminManageClientDataPage";
import { AdminWebUserRegister } from "../pages/admin/AdminWebUserRegister";

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
        <Route element={<PrivateRoute allowedRoles={['cliente']} />}>
          <Route path="/client">
            <Route index element={<ClientDashboardPage />} />
            <Route path='hire-service' element={<ClientHireServicePage />} />
            <Route path='profile' element={<ClientProfilePage />} />
          </Route>
        </Route>


        {/* Rutas técnico (privadas) */}
        <Route element={<PrivateRoute allowedRoles={['tecnico']} />}>
          <Route path='/worker'>
            <Route index element={<WorkerDashboardPage />} />
            <Route path='make-report/:id' element={<WorkerCreateReportPage />} />
          </Route>
        </Route>

        {/* Rutas admin (privadas) */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='/admin'>
            <Route index element={<AdminDashboardPage />} />

            <Route path='manage-routes' element={<AdminPlannerPage />} />

            <Route path='manage-workers' element={<AdminManageWorkersPage />} />
            <Route path='manage-clients' element={<AdminManageClientsPage />} />
            <Route path='manage-clients/edit/:id' element={<AdminManageClientDataPage/>}/>
            <Route path='manage-services' element={<AdminManageServicesPage />} />
            <Route path='manage-services-new' element={<AdminNewServicePage />} />
            <Route path='manage-services-edit/:id' element={<AdminEditServicePage />} />
            <Route path='manage-visits' element={<AdminManageVisitsPage />} />
            <Route path='manage-visits-create' element={<AdminCreateVisitPage />} />
            <Route path='manage-visits-edit/:id' element={<AdminEditVisitPage />} />
            <Route path='manage-users' element={<AdminWebUserRegister />} />
          </Route>
        </Route>

        {/* <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("manage-routes")}>Gestionar rutas </button>
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("manage-workers")}>Gestionar operarios</button>
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("manage-services")}>Gestionar servicios</button>
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("manage-clients")}>Gestionar clientes</button>
        <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("manage-users")}>Gestionar usuarios de la web</button> */}

        {/* Redirección por defecto */}
        <Route path='/*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  );
};
