import { useNavigate } from "react-router";
import { HiredServiceCard } from "../../components/client/HiredServiceCard"
import { HeaderHero } from "../../components/ui/HeaderHero"
import { ServicesList } from "../../components/client/ServicesList";


export const ClientDashboardPage = () => {
  const navigate = useNavigate();
  return (
    <main className="pt-5 pb-5">  
      <HeaderHero
        title="Panel de cliente"
        subtitle="Gestiona tus servicios"
      />

      <div className="d-flex justify-content-center mb-5">
        <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate("/hire-service")}>
          Contratar nuevo servicio
        </button>
        {/* <button type="button" className="btn btn-dark btn-lg ms-2" onClick={() => navigate("/login")}>
          Login
        </button> */}
      </div>  

      <HiredServiceCard/>
      <ServicesList/>
    </main>
  )
}
