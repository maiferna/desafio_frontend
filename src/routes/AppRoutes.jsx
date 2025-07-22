import { Navigate, Route, Routes } from "react-router";
import { MainLayout } from "../components/ui/MainLayout";
import { HomePage, LoginPage } from "../pages/public";
import { ClientDashboardPage, ClientHireServicePage, ClientProfilePage } from "../pages/client";
import { WorkerCreateReportPage, WorkerDashboardPage, WorkerVisitDetailPage } from "../pages/worker";
import { AdminDashboardPage, AdminEditVisitPage, AdminManageClientsPage, AdminManageWorkersPage, AdminPlannerPage } from "../pages/admin";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout común para todas las rutas */}
      <Route path='/' element={<MainLayout />}>

        {/* Rutas públicas */}
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/visit-detail' element={<WorkerVisitDetailPage />} />

        {/* Rutas protegidas para cliente */}
        <Route path="/client" element={<PrivateRoute allowedRoles={["cliente"]} />}>
          <Route index element={<ClientDashboardPage />} />
          <Route path='hire-service' element={<ClientHireServicePage />} />
          <Route path='profile' element={<ClientProfilePage />} />
        </Route>

        {/* Rutas protegidas para worker */}
        <Route path="/worker" element={<PrivateRoute allowedRoles={["operario", "tecnico"]} />}>
          <Route index element={<WorkerDashboardPage />} />
          <Route path='make-report' element={<WorkerCreateReportPage />} />
        </Route>

        {/* Rutas protegidas para admin */}
        <Route path="/admin" element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path='planner' element={<AdminPlannerPage />} />
          <Route path='edit-visit' element={<AdminEditVisitPage />} />
          <Route path='manage-workers' element={<AdminManageWorkersPage />} />
          <Route path='manage-clients' element={<AdminManageClientsPage />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path='/*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  );
};