
import { HeaderHero } from '../../components/ui/HeaderHero'
import { EditClientForm } from '../../components/admin/Clients/EditClientForm'
import { CreateInstallationForm } from '../../components/admin/Installations/CreateInstallationForm'
import { InstallationList } from '../../components/admin/Installations/InstallationList'
import { useParams } from 'react-router'
import { fetchCall } from '../../utils/fetchCall'
import { useEffect, useState } from 'react'


export const AdminManageClientDataPage = () => {
  const { id } = useParams();
  const [installations, setInstallations] = useState([]);

  useEffect(() => {
    const fetchInstallations = async () => {
      try {
        const data = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}installations`);
        setInstallations(data);
      } catch (error) {
        console.error("Error al obtener clientes", error);
      }
    };

    fetchInstallations();
  }, []);
  return (
    <main>
      <HeaderHero
        title={`Gestionar datos`}
      /* subtitle="Añadir instalación" */
      />
      <EditClientForm id={id} />
      <InstallationList installations={installations} setInstallations={setInstallations} />
      <CreateInstallationForm id={id} />
    </main>
  )
}

// TODO: que al darle al botón crear nueva instalación salga el formulario 
// TODO: que las tarjetas de instalaciones se actualicen automáticamente al crear una instalación