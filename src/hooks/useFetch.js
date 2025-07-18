import { useState } from "react";
import { fetchCall } from "../utils/fetchCall";
import { useUser } from "../hooks/useUser";

// CUSTOM HOOK: useFetch (usa token automáticamente si hay login)
export const useFetch = (url, method = "GET", headers = {}, body = null) => {
  const { token } = useUser(); // <- aquí obtenemos el JWT
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchCall(url, method, headers, body, token);
      setData(data);
      setError(null);
      return data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};