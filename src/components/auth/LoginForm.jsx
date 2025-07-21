//import React, { useState } from "react";
// import { useForm } from "../../hooks/useForm";
// import { useUser } from "../../hooks/useUser";
// import { fetchCall } from "../../utils/fetchCall";
//import { useNavigate } from "react-router";




//export const LoginForm = () => {
//   const { formData, handleChange, resetInput, serializeForm } = useForm({
//     email: "",
//     password: "",
//   });

//   const { login } = useUser();
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Limpia errores anteriores
//     const formToSend = serializeForm();

//     try {
//       const data = await fetchCall("http://localhost:5000/api/v1/auth/login", "POST", {}, formToSend);

//       // Al hacer login, guardamos en el contexto global
//       login(data.user, data.token);

//       // Redirigir según el role
//       if (data.user.role === "admin") {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/user");
//       }

//     } catch (err) {
//       setError(err.message || "Error en el login");
//     }
//   };

//   return (
//     <section className="container d-flex flex-column align-items-center justify-content-center my-5 py-4 px-4">


//       <form className='w-100 my-3 px-4'>{/* onSubmit={handleSubmit} */}
//         <div className="mb-3">
//           <label htmlFor="registerEmail" className="fw-bold form-label">Email</label>
//           <input
//             type="email"
//             className="form-control rounded-0"
//             id="registerEmail"
//             name="email"
//             placeholder="Inserta tu email"
//             // value={ formData.email }
//             // onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="registerPassword" className="fw-bold form-label">Contraseña</label>
//           <input
//             type="password"
//             className="form-control rounded-0"
//             id="registerPassword"
//             name="password"
//             placeholder="Inserta tu contraseña"
//             // value={ formData.password }
//             // onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-dark w-100 mt-4 mb-2 rounded-1">
//             Entrar
//         </button>
//         {/* {error && <p className="text-danger">{error.message || String(error)}</p>} */}
//       </form>
//     </section>
//   )
// }


import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useUser } from "../../hooks/useUser";
import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { formData, handleChange, serializeForm } = useForm({
    email: "",
    password: "",
  });

  const { login } = useUser();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); // Limpia errores anteriores
    const formToSend = serializeForm();
    try {

      const data = await fetchCall(`${urlBase}auth`, "POST", {}, formToSend);

      // Al hacer login, guardamos en el contexto global
      login(data.user, data.token);
      console.log('USUARIO LOGUEADO')
      navigate('/login')

      // Redirigir según el role
      // *******IMPORTANTE: CAMBIAR URL POR LA VÁLIDA Y ROLES*******
      /* if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === 'client') {
        navigate("/client-dashboard");
      } else if (data.user.role === 'technician') {
        navigate('/technician-dashboard')
      } */


    } catch (err) {
      if (err?.error) {
        setError(err.error); // errores por campo (mapped)
      } else {
        setError({ general: err.message });
      }
    }
  };

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">

      <form className="w-100 my-3 px-4" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="registerEmail" className="fw-bold form-label">Email</label>
          <input
            type="email"
            className={`form-control ${error?.email ? "is-invalid" : ""}`}
            id="registerEmail"
            name="email"
            placeholder="Ingresa un email"
            value={formData.email}
            onChange={handleChange}
          />
          {error?.email && <div className="invalid-feedback">{error.email.msg}</div>}
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label htmlFor="registerPassword" className="fw-bold form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${error?.password ? "is-invalid" : ""}`}
            id="registerPassword"
            name="password"
            placeholder="Ingresa una contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          {error?.password && <div className="invalid-feedback">{error.password.msg}</div>}
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2">
          Iniciar sesión
        </button>

        {/* Error general */}
        {error?.general && <p className="text-danger">{error.general}</p>}
      </form>
    </section>
  );
};