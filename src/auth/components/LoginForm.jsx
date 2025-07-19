import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useUser } from "../../hooks/useUser";
import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";

/* export const LoginForm = () => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    email: "",
    password: "",
  });

  const { login } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpia errores anteriores
    const formToSend = serializeForm();
    
    try {
      const data = await fetchCall("http://localhost:3000/api/v1/auth", "POST", {}, formToSend);

      // Al hacer login, guardamos en el contexto global
      login(data.user, data.token);

      // Redirigir según el role
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user");
      }

    } catch (err) {
      setError(err.message || "Error en el login");
    }
  };
 
  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">



      <form className='w-100 my-3 px-4' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="fw-bold form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            name="email"
            placeholder="Enter your email"
            value={ formData.email }
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="fw-bold form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            name="password"
            placeholder="Enter your password"
            value={ formData.password }
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">
          Login
        </button>
        {error && <p className="text-danger">{error.message || String(error)}</p>}
      </form>

      <p>or</p>

      <button className="btn btn-light w-100 d-flex align-items-center justify-content-center border rounded-pill px-4 py-2">
        <span className='me-2'>Sign in with Google</span>
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="me-3" width="20" height="20"></img>
      </button>
    </section>
  )
} */


  export const LoginForm = () => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    email: "",
    password: "",
  });

  const { login } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpia errores anteriores
    const formToSend = serializeForm();
    console.log('FORM TO SEND', formToSend)
    
    try {
      // *******IMPORTANTE: CAMBIAR URL POR LA VÁLIDA*******
      const data = await fetchCall(`${urlBase}auth`, "POST", {}, formToSend);

      // Al hacer login, guardamos en el contexto global
      login(data.user, data.token);

      // Redirigir según el role
      // *******IMPORTANTE: CAMBIAR URL POR LA VÁLIDA Y ROLES*******
      /* if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === 'client') {
        navigate("/client-dashboard");
      } else if (data.user.role === 'technician') {
        navigate('/technician-dashboard')
      } */
     console.log('USUARIO LOGUEADO')
     navigate('/login')

    } catch (err) {
      setError(err.message || "Error en el login");
    }
  };
 
  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">

      <form className='w-100 my-3 px-4' onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="fw-bold form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            name="email"
            placeholder="Ingresa un email"
            value={ formData.email }
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="fw-bold form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            name="password"
            placeholder="Ingresa una contraseña"
            value={ formData.password }
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">
          Iniciar sesión
        </button>
        {error && <p className="text-danger">{error.message}</p>}
      </form>
    </section>
  )
}