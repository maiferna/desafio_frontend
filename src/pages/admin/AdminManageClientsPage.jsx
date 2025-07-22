import { HeaderHero } from '../../components/ui/HeaderHero'
import { CreateClientForm } from '../../components/admin/Clients/CreateClientForm'
import { ClientsList } from '../../components/admin/Clients/ClientsLists'
import { useEffect, useState } from 'react';
import { fetchCall } from '../../utils/fetchCall';



export const AdminManageClientsPage = () => {
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}clients`);
        setClients(data);
      } catch (error) {
        console.error("Error al obtener clientes", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <main>
      <HeaderHero
        title="Gestionar clientes"
        subtitle="Crear nuevo cliente"
      />
      <CreateClientForm setClients={setClients}/>

      <ClientsList clients={clients} setClients={setClients}/>
    </main>
  )
}