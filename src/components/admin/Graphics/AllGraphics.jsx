import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { GraphicService } from './GraphicService';
import { GraphicVisitAndService } from './GraphicVisitsAndService';
import { GraphicTimeTecnico } from './GraphicTimeEngineer';
import { GraphicVisits } from './GraphicVisits';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const AllGraphic = () => {
    // Componente reutilizable Card
    const Card = ({ titulo, children }) => (
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-3 text-slate-700">{titulo}</h2>
            <div className="flex-1">{children}</div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-slate-800">
                Graficos de Servicios y Técnicos
            </h1>

            {/* Grid responsivo 1-2-3 columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Card 1 */}
                <Card titulo="Distribucion de Servicios Ejecutados.">
                    <GraphicService />
                </Card>

                {/* Card 2 */}
                <Card titulo="Numero de visitas semanal">
                    <GraphicVisits />
                </Card>

                {/* Card 3 */}
                <Card titulo="Total visitas e inspeciones servicios.">
                    < GraphicVisitAndService />
                </Card>

                {/* Card 4 */}
                <Card titulo="Tiempo semanal por tecnico">
                    <GraphicTimeTecnico />
                </Card>

            </div>
        </div>
    )
}



