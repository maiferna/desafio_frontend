
import { createContext, useContext, useState, useEffect } from "react";
import { fetchCall } from "../utils/fetchCall";

// CREAR CONTEXTO
export const UserContext = createContext();

// PROVEEDOR DEL CONTEXTO
export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true); 
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  // Si hay token, fetchCall cargará el user al montar el componente
  
   useEffect(() => {
    const authUser = async () => {
        // Verificar que haya token para ejecutar el fetchCall
        if (!token) {
            setIsLoading(false);
            return;
        }
        try {
            // Obtener usuario si lo hay
            // *******IMPORTANTE: CAMBIAR URL POR LA VÁLIDA*******
            const data = await fetchCall(`${urlBase}auth/user`, "GET", {}, null, token);
            console.log('DATA RECIBIDA DEL BACK', data)
            setUser(data.user);
        } catch (error) {
            console.log('Error al cargar el usuario', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }
    authUser();
  }, []);

  // Función register: guarda el user en el estado y el token en el localStorage
  const register = (userData, jwtToken) => {
    try {
      localStorage.setItem("token", jwtToken);
      setToken(jwtToken);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  }

  // Función login: guarda user en el estado y token en el localStorage
  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setUser(userData);
  };

  // Función logout: elimina el token del localStorage
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  if (isLoading) return null; // evita renderizar mientras carga datos

  return (
    <UserContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};


