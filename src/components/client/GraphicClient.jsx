


import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 1️⃣  Registrar todo lo que necesitas (una sola vez)
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartDataLabels
);
const puntosInsectocaptores = [
    { "pto": 1, "polillas": 5, "dipteros": 0, "mosquitos": 11, "otros": 0, "total": 16 },
    { "pto": 2, "polillas": 6, "dipteros": 2, "mosquitos": 15, "otros": 3, "total": 26 },
    { "pto": 3, "polillas": 7, "dipteros": 0, "mosquitos": 9, "otros": 5, "total": 21 },
    { "pto": 4, "polillas": 3, "dipteros": 1, "mosquitos": 4, "otros": 0, "total": 8 },
    { "pto": 5, "polillas": 4, "dipteros": 0, "mosquitos": 12, "otros": 0, "total": 16 },
    { "pto": 6, "polillas": 6, "dipteros": 3, "mosquitos": 20, "otros": 0, "total": 29 },
    { "pto": 7, "polillas": 8, "dipteros": 0, "mosquitos": 7, "otros": 5, "total": 20 },
    { "pto": 8, "polillas": 9, "dipteros": 1, "mosquitos": 3, "otros": 0, "total": 13 },
    { "pto": 9, "polillas": 3, "dipteros": 2, "mosquitos": 1, "otros": 4, "total": 10 },
    { "pto": 10, "polillas": 5, "dipteros": 2, "mosquitos": 4, "otros": 0, "total": 11 }
]
const puntosVerificacion = [
    { pto: 1, estado: 'comido', cucaracha: 2, otros: 1, total: 3 },
    { pto: 2, estado: 'comido', cucaracha: 4, otros: 2, total: 6 },
    { pto: 3, estado: 'comido', cucaracha: 1, otros: 1, total: 2 },
    { pto: 4, estado: 'comido', cucaracha: 0, otros: 1, total: 1 },
    { pto: 5, estado: 'comido', cucaracha: 3, otros: 2, total: 5 },
    { pto: 6, estado: 'intacto', cucaracha: 0, otros: 0, total: 0 },
    { pto: 7, estado: 'intacto', cucaracha: 0, otros: 0, total: 0 },
    { pto: 8, estado: 'comido', cucaracha: 2, otros: 1, total: 3 },
    { pto: 9, estado: 'deteriorado', cucaracha: 0, otros: 0, total: 0 },
    { pto: 10, estado: 'comido', cucaracha: 4, otros: 0, total: 4 }
];
import { GraphicRoedorInterior } from './Graphic/GraphicRoedorInterior';
import { GraphicRoedorExterior } from './Graphic/GraphicRoedorExterior';
import { GraphicInsectosArrastrantes } from './Graphic/GraphicArrastrantes';
import { GraphicInsectocaptores } from './Graphic/GraphicInsectocaptores';


export const GraphicClient = () => {
    return (
        <div>
            <div>
                <GraphicRoedorInterior />
            </div>
            <div>
                <GraphicRoedorExterior />
            </div>
            <div>
                <GraphicInsectosArrastrantes datos={puntosVerificacion} />
            </div>
            <div>
                <GraphicInsectocaptores datos={puntosInsectocaptores} />
            </div>
        </div>

    )
}
