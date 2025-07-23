import { useEffect, useState } from "react";
import { fetchCall } from "../utils/fetchCall";
import { useUser } from "../hooks/useUser";

export const useFetch = (
  endpoint,
  method = "GET",
  header = {},
  body = {},
  token = null
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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