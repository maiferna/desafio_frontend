import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const GraphicTimeTecnico = () => {
    const [raw, setRaw] = useState([]);

    // 1. Fetch live data
    useEffect(() => {
        fetch('/api/tiempo_tecnicos')
            .then(res => res.json())
            .then(setRaw)
            .catch(console.error);
    }, []);

    // 2. Loading state
    if (!raw.length) {
        return (
            <div style={{ width: '100%', height: 700, display: 'grid', placeItems: 'center' }}>
                Cargando…
            </div>
        );
    }

    // 3. Build labels & datasets
    const semanas = [...new Set(raw.map(r => r.semana))].sort();
    const labels = semanas.map(s => format(new Date(s), 'd MMM', { locale: es }));

    const tecnicos = [...new Set(raw.map(r => r.nombre))];
    const colores = [
        '#8884d8', '#82ca9d', '#ffc658', '#ff7300',
        '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
        '#0088FE', '#FF4560', '#775DD0'
    ];

    const datasets = tecnicos.map((tecnico, idx) => ({
        label: tecnico,
        data: semanas.map(sem =>
            raw.find(r => r.semana === sem && r.nombre === tecnico)?.total_minutos ?? 0
        ),
        borderColor: colores[idx % colores.length],
        backgroundColor: colores[idx % colores.length],
        tension: 0.3,
        pointRadius: 4
    }));

    const chartData = { labels, datasets };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                callbacks: {
                    label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} min`
                }
            }
        },
        scales: {
            y: { title: { display: true, text: 'Minutos trabajados' } }
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', aspectRatio: '16 / 9' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

