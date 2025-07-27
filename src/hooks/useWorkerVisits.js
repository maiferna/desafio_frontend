import { useEffect, useState } from "react";
import { fetchCall } from "../utils/fetchCall";

export const useWorkerVisits = () => {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getVisits = async () => {
            try {
                const res = await fetchCall(
                    `${import.meta.env.VITE_API_URL_BASE}visits/my-visits`,
                    "GET"
                );
                setVisits(res.data);
            } catch (error) {
                console.error("Error cargando visitas del técnico", error);
            } finally {
                setLoading(false);
            }
        };

        getVisits();
    }, []);

    return { visits, loading };
};
