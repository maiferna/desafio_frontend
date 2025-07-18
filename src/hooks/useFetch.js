import React, { useContext, useState } from 'react';
import { consultFetch } from '../api/consultFetch';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';



export const useFetch = () => {

  const navigate = useNavigate();

  const { user, setUser, isRegister, setRegister } = useContext(UserContext)

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const get = async (url) => {
    console.log("Dentro del fetch get")
    setIsLoading(true);

    try {
      const response = await consultFetch(url)
      console.log(response.data)
      const { data: noticias } = response
      setIsLoading(false);
      setData(noticias)
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
      setIsError(error)
    }

  }

  const login = async (url, body, header = {}) => {
    console.log("Dentro del fetch login")
    setIsLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...header,
        "Content-Type": "application/json",

      }
    }

    try {
      const response = await consultFetch(url, options)
      console.log("respuesta login: ", response)
      //const { user } = response
      setIsLoading(false);
      setData(response);
      settoken(response.token)
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
      setIsError(error)
    }

  }


  const settoken = (token) => {
    localStorage.setItem('token', token)
    navigate("/")
  }


  const register = async (url, body, header = {}) => {
    console.log("Dentro del fetch register")
    setIsLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    }


    try {
      const response = await consultFetch(url, options)
      console.log("respuesta register: ", response)
      const { data: noticias } = response
      setIsLoading(false);
      setData(noticias)
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
      setIsError(error)
    }

  }

  const update = async (url, body, header = {}) => {
    setIsLoading(true);
    console.log("update body: ", body)
    const options = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    }

    try {
      const response = await consultFetch(url, options)
      console.log(response.data)
      const { data: noticias } = response
      console.log("update data: ", data);
      setIsLoading(false);
      setData(noticias)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(error)
    }

  }
  const create = async (url, body, header = {}) => {
    setIsLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    }

    try {
      const response = await consultFetch(url, options)
      console.log(response.data)
      const { data: noticias } = response
      setIsLoading(false);
      setData(noticias)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(error)
    }

  }

  const delet = async (url, body, header = {}) => {
    setIsLoading(true);
    const options = {
      method: "DELETE",
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    }


    try {
      const response = await consultFetch(url, options)
      console.log(response.data)
      const { data: noticias } = response
      setIsLoading(false);
      setData(noticias)
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
      setIsError(error)
    }

  }

  return {
    get,
    login,
    register,
    update,
    create,
    delet,
    setData,
    data,
    isLoading,
    isError
  }

}



/*
 
 useEffect(() => {
     // Este no es el mejor lugar para este if. Esta mejor en los componentes que lo necesiten







     if (!url) return;
   
   setIsLoading(true);
   consultFetch(url, metodo, body, header)
   .then(response => {
     if (!response.ok) {
       throw new Error('Error en la respuesta');
     }
     return response.json();
   })
   .then(data => {
     setData(data);
     setIsLoading(false);
   })
   .catch(error => {
     setIsError(error.message);
     setIsLoading(false);
   });
}, []);

 return {
     data,
     isLoading,
     isError
 }

} */