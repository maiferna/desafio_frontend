import { Doughnut } from 'react-chartjs-2';

export const GraphicRoedorInterior = () => {
    const data = {
        labels: ['Intacto', 'Comido', 'Deteriorado'],
        datasets: [
            {
                data: [14, 15, 6], // <-- Datos desde el JSON
                backgroundColor: ['#00ff00', '#ff0000', '#ffff00'],
                borderColor: ['#fff'],
                borderWidth: 2
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom'
            },
            datalabels: {
                color: '#000',
                font: {
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    const total = context.chart._metasets[0].total;
                    const percent = ((value / total) * 100).toFixed(0);
                    return `${percent}%`;
                }
            }
        },
        cutout: '40%' // para que se vea como donut
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: 400,          // ← no crece más allá de 400 px
            margin: '0 auto',       // ← centrado
            aspectRatio: '1 / 1',   // ← mantiene forma de círculo
        }}>
            <h3 className="text-center">Roedores Zona Interior</h3>
            <Doughnut data={data} options={options} />
        </div>
    );
};
