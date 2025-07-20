import React from 'react'
import { HeaderHero } from '../../components/ui/HeaderHero';
import { useNavigate } from 'react-router';
import { DetailedVisitCard } from '../../components/workers/DetailedVisitCard';


export const WorkerVisitDetailPage = () => {
  const navigate = useNavigate();

  return (
    <main className="my-5 pb-5">
      <HeaderHero 
        title="Detalles de la visita"
        subtitle=""
      />

      <div className="d-flex justify-content-center pb-5 gap-2">
        {/* <button type="button" className="btn btn-light btn-lg rounded-1" onClick={() => navigate("worker-panel")}>Volver</button> */}
        <button type="button" className="btn btn-dark btn-lg rounded-1 w-100 mx-5" onClick={() => navigate("../make-report")}>Crear informe de visita 📋</button>
      </div>

      <DetailedVisitCard/>

    </main>
  )
}