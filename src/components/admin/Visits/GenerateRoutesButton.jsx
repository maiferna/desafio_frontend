import React from 'react'
import { fetchCall } from '../../../utils/fetchCall';

export const GenerateRoutesButton = ({ visits, setVisits, setRoutes }) => {

    const calculateRoutes = (json) => {
        const { tecnicos, localizaciones } = json;

        if (!tecnicos || tecnicos.length === 0 || !localizaciones || localizaciones.length < 2) {
            return { rutas: [] };
        }

        // Shuffle visits (para distribución aleatoria)
        const shuffledVisits = [...localizaciones].sort(() => Math.random() - 0.5);

        // Calcular número máximo de rutas posibles con mínimo 2 visitas cada una
        const maxRutas = Math.floor(shuffledVisits.length / 2);
        const totalRutas = Math.min(maxRutas, tecnicos.length);

        const rutas = [];
        const visitasPorRuta = Math.floor(shuffledVisits.length / totalRutas);
        let index = 0;

        for (let i = 0; i < totalRutas; i++) {
            const remaining = shuffledVisits.length - index;
            const count = i === totalRutas - 1 ? remaining : visitasPorRuta; // la última se queda con las que queden
            const grupoVisitas = shuffledVisits.slice(index, index + count);
            index += count;

            // Asignar técnicos (opcionalmente en pareja)
            const assignedTechnicians = [tecnicos[i]];
            if (i + 1 < tecnicos.length && Math.random() > 0.5) {
                assignedTechnicians.push(tecnicos[i + 1]);
            }

            // Calcular tiempo_llegada acumulado
            let acumulado = 0;
            const visitasConTiempos = grupoVisitas.map(v => {
                const llegada = acumulado;
                acumulado += (v.tiempo || 0.5) * 60; // convertir a minutos
                return {
                    id_instalacion: v.id_instalacion,
                    lat: v.lat,
                    lon: v.long,
                    tiempo_llegada: llegada
                };
            });

            rutas.push({
                fecha: new Date().toISOString().slice(0, 10),
                tecnicos: assignedTechnicians,
                visitas: visitasConTiempos
            });
        }

        return { rutas };
    };


    const handleClick = async () => {
        if (!visits || visits.length === 0) {
            console.warn("No visits available to generate JSON");
            return;
        }

        const unassignedVisits = visits.filter(v => !v.id_ruta);

        const json = {
            mes: "Agosto",
            tecnicos: [1, 2, 3, 4],
            localizaciones: unassignedVisits.map(v => ({
                id_instalacion: v.id_instalacion,
                localidad: v.localidad,
                lat: parseFloat(v.lat),
                long: parseFloat(v.lon),
                tiempo: parseFloat(v.tiempo || 4),
            })),
        };

        console.log("Generated Planning JSON:", json);

        // const { rutas } = calculateRoutes(json);
        const { rutas } = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}routes/planification`,
            "POST", {}, json
        )
        console.log(rutas);
        for (const ruta of rutas) {
            const createdRoute = await fetchCall(
                `${import.meta.env.VITE_API_URL_BASE}routes`,
                "POST",
                { "Content-Type": "application/json" },
                {
                    tecnico_responsable: ruta.tecnicos[0],
                    tecnico: ruta.tecnicos[0],
                    tecnico_asistente: ruta.tecnicos[1] || null,
                    fecha: ruta.fecha,
                }
            );

            for (const visitaRuta of ruta.visitas) {
                const visitToAssign = visits.find(
                    (v) => v.id_instalacion === visitaRuta.id_instalacion && !v.id_ruta
                );

                if (!visitToAssign) {
                    console.warn(`No se encontró visita para la instalación ${visitaRuta.id_instalacion}`);
                    continue;
                }

                await fetchCall(
                    `${import.meta.env.VITE_API_URL_BASE}visits/${visitToAssign.id_visita}/route`,
                    "PUT",
                    { "Content-Type": "application/json" },
                    { routeId: createdRoute.id_ruta }
                );
            }
        }


        try {
            const updatedVisits = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits`);
            const updatedRoutes = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}routes`);
            setVisits(updatedVisits);
            setRoutes(updatedRoutes);
        } catch (error) {
            console.error("Error actualizando datos tras crear rutas:", error);
        }

        console.log("Route generation and assignment completed.");
    };

    return (
        <button className="btn btn-dark btn-lg mb-3 rounded-1 w-100"
            onClick={handleClick}>
            Generar rutas con visitas disponibles
        </button>
    );
};
