import { Line } from 'react-chartjs-2';

export const GraphicInsectocaptores = ({ datos }) => {
    const data = {
        labels: datos.map(p => `IN-${p.pto}`),
        datasets: [
            {
                label: 'Polillas',
                data: datos.map(p => p.polillas),
                borderColor: '#D2B48C',
                backgroundColor: '#1313c883',
                tension: 0.3,
                fill: false,
            },
            {
                label: 'Dípteros',
                data: datos.map(p => p.dipteros),
                borderColor: '#E0E0E0',
                backgroundColor: '#eb1010ee',
                tension: 0.3,
                fill: false,
            },
            {
                label: 'Mosquitos',
                data: datos.map(p => p.mosquitos),
                borderColor: '#8D6E63',
                backgroundColor: '#19d500af',
                tension: 0.3,
                fill: false,
            },
            {
                label: 'Otros',
                data: datos.map(p => p.otros),
                borderColor: '#4439e4ff',
                backgroundColor: '#A5D6A733',
                tension: 0.3,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 30,
            },
        },
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: 600,          // ← no crece más allá de 400 px
            margin: '0 auto',       // ← centrado
            aspectRatio: '1 / 1',   // ← mantiene forma de círculo
        }}>
            <h3 style={{ textAlign: 'center' }}>Insectocaptores </h3>
            <Line data={data} options={options} />
        </div>
    );
};