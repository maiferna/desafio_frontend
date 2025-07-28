import { useNavigate } from "react-router";
import { HiredServiceCard } from "../../components/client/HiredServiceCard"
import { HeaderHero } from "../../components/ui/HeaderHero"
import { ServicesList } from "../../components/client/ServicesList";
import { ClientProfileCard } from "../../components/client/ClientProfileCard";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { fetchCall } from "../../utils/fetchCall";



export const ClientDashboardPage = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null)
  const [client, setClient] = useState(null)
  const { user } = useUser();
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  
  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const userData = await fetchCall(`${urlBase}users/${user.id}`);
        setLoggedUser(userData);

        if (userData?.id_cliente) {
          const clientData = await fetchCall(`${urlBase}clients/${userData.id_cliente}`);
          setClient(clientData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  if (!loggedUser || !client) {
    return null;
  }

  return (
    <main className="pt-5 pb-5">
      <HeaderHero
        title="Panel de cliente"
        subtitle="Gestiona tus servicios"
      />

      <HiredServiceCard />
      <ServicesList />
      <ClientProfileCard client={client}/>
    </main>
  )
}
