import React from 'react'
// import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router';

export const LogoutButton = () => {
//   const { logout } = useUser();
  const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();            // Limpiar contexto + localStorage
//     navigate('/login');  // Redirigir al login (o '/' si prefieres)
//   };

  return (
    <li className="btn btn-outline-danger ms-3 rounded-1" >{/* onClick={handleLogout} */}
      <i className="bi bi-box-arrow-right me-2"></i>
      Logout
    </li>
  )
}