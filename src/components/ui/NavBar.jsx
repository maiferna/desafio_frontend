import { NavLink } from "react-router"
import { LogoutButton } from "../auth/LogoutButton"
// import { useUser } from "../../contexts/userContext";


// NAVBAR
export const NavBar = () => {
    //const { user, logout } = useUser();
    
    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top px-3">
        <div className="container-fluid  d-flex justify-content-between align-items-center">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <img
                src="https://plaguatec.com/wp-content/uploads/2022/09/plaguatec-logotipo@4x.png"
                alt="Logotipo de Plaguatec"
                className="img-fluid"
                style={{ maxHeight: '50px' }}
            />
        </NavLink>
        
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
                </>
            {/* )} */}

            {/* {user?.role === "operario" && ( */}
                <>
                <li><NavLink to="/worker" className="nav-link">Panel de Operario</NavLink></li>                </>
            {/* )} */}


            {/* {user?.role === "admin" && ( */}
                <>
                <li><NavLink to="/admin" className="nav-link">Panel de Administrador</NavLink></li>
                <li><NavLink to="/admin/planner" className="nav-link">Planificación</NavLink></li>
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