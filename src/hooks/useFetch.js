import { useEffect, useState } from "react";
import { fetchCall } from "../utils/fetchCall";

// CUSTOM HOOK: useFetch (usa token automáticamente si hay login)
export const useFetch = (url, method = "GET", headers = {}, body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchCall(endpoint, method, header, body, token);
      console.log({ data });

      // Accept both: array directly, or { ok: true, data: [...] }
      if (Array.isArray(data)) {
        setData(data);
      } else if (data.ok && data.data) {
        setData(data.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!endpoint) return;
    fetchData();
  }, [endpoint]);

  return { data, setData, loading, error };
};