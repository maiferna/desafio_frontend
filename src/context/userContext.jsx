import { createContext, useContext, useState, useEffect } from "react";
// import {
//   saveUserToLocalStorage,
//   getUserFromLocalStorage,
//   clearUserFromLocalStorage,
// } from "../utils/localStorage";

// CREAR CONTEXTO
export const UserContext = createContext();

// PROVEEDOR DEL CONTEXTO
export const UserProvider = ({ children }) => {
//   const initialData = getUserFromLocalStorage();

//   const [user, setUser] = useState(initialData?.user || null);
//   const [token, setToken] = useState(initialData?.token || null);
//   const [isLoading, setIsLoading] = useState(true); 

//    useEffect(() => {
//     setUser(initialData?.user || null);
//     setToken(initialData?.token || null);
//     setIsLoading(false); //cuando carga localStorage, desactiva el loading
//   }, []);

// // Efecto para sincronizar con localStorage cada vez que cambia user o token
//   useEffect(() => {
//     if (user && token) {
//       saveUserToLocalStorage({ user, token });
//     } else {
//       clearUserFromLocalStorage();
//     }
//   }, [user, token]);

//   // Función login: guarda user y token en el estado
//   const login = (userData, jwtToken) => {
//     setUser(userData);
//     setToken(jwtToken);
//   };

//   // Función logout: limpia todo
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     clearUserFromLocalStorage();
//   };

//   if (isLoading) return null; // evita renderizar mientras carga datos

//   return (
//     <UserContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser debe usarse dentro de UserProvider");
//   }
//   return context;
};
