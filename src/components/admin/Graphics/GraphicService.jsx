import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';


export const GraphicService = () => {
    const [dataRaw, setDataRaw] = useState([]);

    useEffect(() => {
        fetch('/api/servicios_ejecutados')
            .then(res => res.json())
            .then(setDataRaw)
            .catch(console.error);
    }, []);

    if (!dataRaw.length) {
        return (
            <div style={{ width: '100%', height: 380, display: 'grid', placeItems: 'center' }}>
                Cargando…
            </div>
        );
    }

    const labels = dataRaw.map(d => d.nombre);
    const values = dataRaw.map(d => +Number(d.porcentaje).toFixed(1));

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                borderWidth: 5,
                hoverOffset: 50,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '35%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#989b0dff',
                    font: { size: 16 },
                    padding: 12,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                callbacks: {
                    label: ctx => `${ctx.label}: ${ctx.formattedValue}%`,
                },
            },
            datalabels: {
                color: '#111',
                anchor: 'center',
                align: 'center',
                formatter: (_, ctx) => ctx.dataset.data[ctx.dataIndex],
                font: { size: 24, weight: 'bold' },
            },
        },
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: 400,          // ← no crece más allá de 400 px
                margin: '0 auto',       // ← centrado
                aspectRatio: '1 / 1',   // ← mantiene forma de círculo
            }}
        >
            <Doughnut data={data} options={options} />
        </div>
    );
};