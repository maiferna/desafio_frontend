import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useUser";

export const PrivateRoute = ({ allowedRoles }) => {
    const { user, isLoading } = useUser(); // Asegúrate de exponer isLoading en tu hook

    if (isLoading) return null; // Esperar a que termine de cargar el contexto

    if (!user) return <Navigate to="/login" />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};