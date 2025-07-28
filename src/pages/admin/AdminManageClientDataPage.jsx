
import { HeaderHero } from '../../components/ui/HeaderHero'
import { EditClientForm } from '../../components/admin/Clients/EditClientForm'
import { CreateInstallationForm } from '../../components/admin/Installations/CreateInstallationForm'
import { InstallationList } from '../../components/admin/Installations/InstallationList'
import { useParams } from 'react-router'
import { fetchCall } from '../../utils/fetchCall'
import { useEffect, useState } from 'react'


export const AdminManageClientDataPage = () => {
  // id del cliente 
  const { id } = useParams();
  const [installations, setInstallations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchInstallations = async () => {
      try {
        const data = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}installations/client/${id}`);
        setInstallations(data);
      } catch (error) {
        console.error("Error al obtener clientes", error);
      }
    };

    fetchInstallations();
  }, []);

  return (
    <main className="mx-4 d-flex flex-column justify-content-center">
      <HeaderHero
        title={`Gestionar datos de cliente`}
        subtitle="Editar cliente y añadir instalaciones"
      />
      <EditClientForm id={id} />
      <button
        className="btn btn-primary mt-5 btn-lg w-auto mx-5"
        onClick={() => setShowForm(prev => !prev)}
      >
        {showForm ? "Ocultar formulario" : "Crear nueva instalación"}
      </button>
      {
        showForm && (
          <CreateInstallationForm id={id} setInstallations={setInstallations} />
        )
      }
      <InstallationList installations={installations} setInstallations={setInstallations} />
    </main>
  )
}

// TODO: que al darle al botón crear nueva instalación salga el formulario 
// TODO: que las tarjetas de instalaciones se actualicen automáticamente al crear una instalación