import React, { useState } from "react";
// import { useForm } from "../../hooks/useForm";
// import { useUser } from "../../hooks/useUser";
// import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";




export const LoginForm = () => {
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
 
  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 py-4 px-4">


      <form className='w-100 my-3 px-4'>{/* onSubmit={handleSubmit} */}
        <div className="mb-3">
          <label htmlFor="registerEmail" className="fw-bold form-label">Email</label>
          <input
            type="email"
            className="form-control rounded-0"
            id="registerEmail"
            name="email"
            placeholder="Inserta tu email"
            // value={ formData.email }
            // onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="fw-bold form-label">Contraseña</label>
          <input
            type="password"
            className="form-control rounded-0"
            id="registerPassword"
            name="password"
            placeholder="Inserta tu contraseña"
            // value={ formData.password }
            // onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2 rounded-1">
            Entrar
        </button>
        {/* {error && <p className="text-danger">{error.message || String(error)}</p>} */}
      </form>
    </section>
  )
}