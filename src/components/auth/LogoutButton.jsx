import { useUser } from '../../hooks/useUser.js';
import { useNavigate } from 'react-router';

export const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  //   const handleLogout = async() => {
  //     logout();            // Limpiar contexto + localStorage
  //     navigate('/login');  // Redirigir al login (o '/' si prefieres)
  //   };
  const handleLogout = async () => {
    await logout();       // Llama a la API y limpia el contexto
    navigate('/login');   // Redirige a login
  };

  return (
    <li
      className="btn btn-outline-danger ms-3 rounded-1"
      onClick={handleLogout}
    >
      <i className="bi bi-box-arrow-right me-2"></i>
      Logout
    </li>
  )
}