import { Bar } from 'react-chartjs-2';

export const GraphicInsectosArrastrantes = ({ datos }) => {

    const totalInsectos = datos.reduce((acc, punto) => acc + punto.total, 0);

    const backgroundColor = datos.map(punto => {
        if (punto.estado === 'intacto') return '#02756f';      // verde
        if (punto.estado === 'comido') return '#ff5100';       // rojo
        if (punto.estado === 'deteriorado') return '#68b0bd';  // amarillo
        return '#ccc';
    });

    const data = {
        labels: datos.map(p => `Pto ${p.pto}`),
        datasets: [
            {
                label: 'Insectos',
                data: datos.map(p =>
                    p.total === 0 && (p.estado === 'intacto' || p.estado === 'deteriorado')
                        ? 1   // barra simbólica de altura 1
                        : p.total
                ),
                backgroundColor
            }
        ]
    };

    const options = {
        indexAxis: 'x',
        responsive: true,
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end',
                align: 'end',
                formatter: (value) => {
                    if (totalInsectos === 0) return '0%';
                    const percent = ((value / totalInsectos) * 100).toFixed(1);
                    return `${percent}%`;
                },
                color: '#000',
                font: {
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Insectos: ${context.raw}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,

            }
        }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: 600,          // ← no crece más allá de 400 px
            margin: '0 auto',       // ← centrado
            aspectRatio: '1 / 1',   // ← mantiene forma de círculo
        }}>
            <h3 style={{ textAlign: 'center' }}>Insectos Arrastrantes por Punto</h3>
            <Bar data={data} options={options} />
        </div>
    );
};


