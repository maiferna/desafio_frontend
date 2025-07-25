import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useUser";

export const PrivateRoute = ({ allowedRoles }) => {
    const { user, isLoading } = useUser();

    if (isLoading) {
        // muestra un loader mientras se carga el usuario
        return <p className="text-center mt-5">Cargando...</p>;
    }

    if (!user) {
        // No autenticado, redirige a login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Autenticado pero con rol no permitido, redirige a home
        return <Navigate to="/" replace />;
    }

    // Todo OK renderiza la ruta protegida
    return <Outlet />;
};