import { useState }  from 'react'
import { useForm } from '../../hooks/useForm';
import { useUser } from "../../hooks/useUser";
import { fetchCall } from "../../utils/fetchCall";
import { useNavigate } from "react-router";


export const SignupForm = () => {
  const { formData, handleChange, resetInput, serializeForm } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formToSend = serializeForm();

    try {
      const data = await fetchCall("http://localhost:5000/api/v1/auth/register", "POST", {}, formToSend);

      // Guardar en contexto global
      login(data.user, data.token);

      // Redirigir según rol
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message || "Error al registrarse");
    }
  };



  
  return (
    <section className="container d-flex flex-column align-items-center justify-content-center my-5 border border-1 rounded-3 py-4 px-4">

      <form className='w-100 my-3 px-4' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registerName" className="fw-bold form-label">*User Name</label>
          <input
            type="text"
            className="form-control"
            id="registerName"
            placeholder="Enter a username"
            name="name"
            value={ formData.name }
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerEmail" className="fw-bold form-label">*Email</label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            placeholder="Enter a valid email"
            name="email"
            value={ formData.email }
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="fw-bold form-label">*Password</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            placeholder="Create a password"
            name="password"
            value={ formData.password } 
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4 mb-2"> Register </button>
         {error && <p className="text-danger">{error.message || String(error)}</p>}
      </form>

      <p>or</p>

      <button className="btn btn-light w-100 d-flex align-items-center justify-content-center border rounded-pill px-4 py-2">
        <span className='me-2'>Sign in with Google</span>
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="me-3" width="20" height="20"></img>
      </button>
     
      
    </section>
  )
}