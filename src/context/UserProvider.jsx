import React, { useEffect, useRef, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router';

export const UserProvider = ({ children }) => {

    const navigate = useNavigate();

    // Nota para mi yo del futuro: Chatgpt me recomendo 'jose' para el payload. Puta mierda, no da más que poblemas
    let token;
    let newUser;


    token = localStorage.getItem('token') || null;
    // console.log({ token }, 'en linea 13')


    const [user, setUser] = useState({});
    const [isRegister, setRegister] = useState(false);
    const { decodedToken, isExpired } = useJwt(token);

    useEffect(() => {
        // token = localStorage.getItem('token') || null;
        // console.log({ token })

        // console.log({ decodedToken })


        if (decodedToken !== null) {
            // console.log("UserProvider paiload: ", decodedToken);
            newUser = {
                id: decodedToken.id,
                role: decodedToken.role
            }
            // console.log("NuevoUsuario: ", newUser)
            setUser(newUser);
            setRegister(true);
        }

    }, [decodedToken])




    const logoutContext = () => {
        setRegister(false)
        setUser({})
        localStorage.removeItem('token');
        navigate("./");
    }
    const loginContext = () => { setRegister(true) }


    return (
        <UserContext.Provider value={{ user, setUser, isRegister, logoutContext, loginContext }}>
            {children}
        </UserContext.Provider>
    )
}