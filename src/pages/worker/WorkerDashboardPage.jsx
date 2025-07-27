// import { HeaderHero } from '../../components/ui/HeaderHero'
// import { VisitsList } from '../../components/workers/VisitsList';
// import { RouteMap } from '../../components/workers/RouteMap';
// import { useNavigate } from 'react-router';

// export const WorkerDashboardPage = () => {
//   const navigate = useNavigate();

//   return (
//     <main className="my-5 pb-5">
//       <HeaderHero 
//         title="Panel de operario"
//         subtitle=""
//       />
//       {/* <div className="d-flex justify-content-center mb-5 pb-5">
//         <button type="button" className="btn btn-dark btn-lg me-2 rounded-1" onClick={() => navigate("/worker/dashboard")}>Ruta del día</button>
//         <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => navigate("make-report")}>Crear nuevo informe</button>
//       </div> */}

//       <VisitsList title="Visitas asignadas"/>
//       <RouteMap/>

//       {/* <section>
//         <p>Materiales (igual no es necesario)</p>
//       </section> */}
//     </main>
//   )
// }

// import { useMyVisits } from "../../hooks/useMyVisits";
// import { VisitRowAdmin } from "../../components/admin/Visits/VisitRowAdmin";

// export const WorkerDashboardPage = () => {
//   const { visits, isLoading, error } = useMyVisits();

//   return (
//     <section className="container py-4">
//       <h2 className="fw-bold mb-4">Mis Visitas Asignadas</h2>

//       {isLoading && <p>Cargando visitas...</p>}
//       {error && <p className="text-danger">{error}</p>}

//       {visits.length === 0 && !isLoading ? (
//         <p>No tienes visitas asignadas actualmente.</p>
//       ) : (
//         <div className="list-group">
//           {visits.map((visit) => (
//             <div className="list-group-item rounded-3 mb-2" key={visit.id_visita}>
//               <VisitRowAdmin visit={visit} setData={() => { }} />
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };
import { useWorkerVisits } from "../../hooks/useWorkerVisits";
import { VisitsList } from "../../components/workers/VisitsList";

export const WorkerDashboardPage = () => {
  const { visits, loading } = useWorkerVisits();

  if (loading) return <p>Cargando visitas asignadas...</p>;

  return (
    <section className="container my-4">
      <h2 className="fw-bold mb-3">Mis visitas asignadas</h2>
      {visits.length === 0 ? (
        <p>No tienes visitas asignadas.</p>
      ) : (
        <VisitsList visits={visits} />
      )}
    </section>
  );
};