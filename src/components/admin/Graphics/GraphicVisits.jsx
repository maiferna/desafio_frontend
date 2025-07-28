import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export const GraphicVisits = () => {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        fetch('/api/visitas_semanales')
            .then(res => res.json())
            .then(setDatos)
            .catch(console.error);
    }, []);

    if (!datos.length) {
        return (
            <div style={{ width: '100%', height: 380, display: 'grid', placeItems: 'center' }}>
                Cargando…
            </div>
        );
    }

    const labels = datos.map(d =>
        format(new Date(d.semana), 'd MMM', { locale: es })
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Visitas',
                data: datos.map(d => d.visitas),
                backgroundColor: '#8884d8CC',
                borderColor: '#141417ff',
                borderWidth: 3,
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    formatter: v => v,
                    color: '#111',
                    font: { size: 20, weight: 'bold' },
                },
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: ctx => `${ctx.parsed.y} visitas`,
                },
            },
            datalabels: { color: '#111' },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: 380 }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};