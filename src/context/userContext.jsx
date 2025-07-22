import { createContext, useContext, useState, useEffect } from "react";
import { fetchCall } from "../utils/fetchCall";

// CREAR CONTEXTO
export const UserContext = createContext();

// PROVEEDOR DEL CONTEXTO
export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  // Si hay token, fetchCall cargará el user al montar el componente

  useEffect(() => {
    const authUser = async () => {
      try {
        const data = await fetchCall(`${urlBase}auth/user`);
        setUser(data.user);
      } catch (error) {
        console.log("Usuario no autenticado", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    authUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetchCall(`${urlBase}auth/logout`, "POST");
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  if (isLoading) return null; // evita renderizar mientras carga datos

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};


