import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export const GraphicVisitAndService = () => {
    const [raw, setRaw] = useState([]);

    useEffect(() => {
        fetch('/api/visitas_por_servicio')
            .then(res => res.json())
            .then(setRaw)
            .catch(console.error);
    }, []);

    if (!raw.length) {
        return (
            <div style={{ width: '100%', height: 380, display: 'grid', placeItems: 'center' }}>
                Cargando…
            </div>
        );
    }
    // 1. Preparar semanas
    const semanas = [...new Set(raw.map(r => r.semana))].sort();
    const labels = semanas.map(s => format(new Date(s), 'd MMM', { locale: es }));

    // 2. Servicios y colores
    const servicios = ['Inspección Roedores', 'Inspección Insectos', 'Control Legionela'];
    const colores = ['#8884d8', '#82ca9d', '#ffc658'];

    // 3. Datos: una barra (total) + tres líneas
    const datasets = [
        // Barra total
        {
            type: 'bar',
            label: 'Total visitas',
            data: semanas.map(s =>
                raw.filter(r => r.semana === s).reduce((sum, r) => sum + r.visitas, 0)
            ),
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            yAxisID: 'y',
            datalabels: {
                align: 'top',
                anchor: 'end',
                formatter: v => v,
                color: 'blue',
                font: { size: 16, weight: 'bold' },
            },
        },
        // Líneas individuales
        ...servicios.map((srv, idx) => ({
            type: 'line',
            label: srv,
            data: semanas.map(s =>
                raw.find(r => r.semana === s && r.servicio === srv)?.visitas ?? 0
            ),
            borderColor: colores[idx],
            backgroundColor: colores[idx],
            borderWidth: 2,
            fill: false,
            tension: 0.3,
            pointRadius: 4,
            yAxisID: 'y',
        })),
    ];

    const data = { labels, datasets };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
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
            <Chart type="bar" data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
    )
}

