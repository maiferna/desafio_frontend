import { NavLink } from "react-router"
import { LogoutButton } from "../auth/LogoutButton"
// import { useUser } from "../../contexts/userContext";


// NAVBAR
export const NavBar = () => {
    //const { user, logout } = useUser();
    
    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top px-3">
        <div className="container-fluid">
        <NavLink to="/" className="nav-link navbar-brand fw-bold fs-3">Plaguatec</NavLink>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto text-center d-flex gap-2">
            <li><NavLink to="/" className="nav-link"> Homepage </NavLink></li>

            {/* {!user && ( */}
                <>
                <li><NavLink to="/login" className="nav-link">Login </NavLink></li>
                </>
            {/* )} */}

            {/* {user?.role === "cliente" && ( */}
                <>
                <li><NavLink to="/client" className="nav-link">Panel de Cliente </NavLink></li>
                <li><NavLink to="/client/hire-service" className="nav-link">Contratar servicio </NavLink> </li>
                <li><NavLink to="/client/profile" className="nav-link">Datos de mi empresa </NavLink></li>
                </>
            {/* )} */}

            {/* {user?.role === "operario" && ( */}
                <>
                <li><NavLink to="/worker" className="nav-link">Panel de Operario</NavLink></li>
                <li><NavLink to="/worker/make-report" className="nav-link">Crear Informe</NavLink></li>
                </>
            {/* )} */}


            {/* {user?.role === "admin" && ( */}
                <>
                <li><NavLink to="/admin" className="nav-link">Panel de Administrador</NavLink></li>
                <li><NavLink to="/admin/planner" className="nav-link">Planner</NavLink></li>
                <li><NavLink to="/admin/register-client" className="nav-link">Registrar Cliente</NavLink></li>
                <li><NavLink to="/admin/manage-workers" className="nav-link">Gestionar Operarios</NavLink></li>
                <li><NavLink to="/admin/manage-clients" className="nav-link">Gestionar Clientes</NavLink></li>
                </>
            {/* )} */}

            {/* {user && (<LogoutButton />)} */}
            <LogoutButton />
            
            </ul>
        </div>
        </div>
    </nav>

        
    )
    }