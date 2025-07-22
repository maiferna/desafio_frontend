
import { useNavigate } from 'react-router';
import { fetchCall } from '../../../utils/fetchCall';

export const ClientRow = ({ client, setClients }) => {
  const navigate = useNavigate();
  const onEditClient = () => {
    navigate(`/admin/manage-clients/edit/${client.id_cliente}`);
  }
  const onDeleteClient = () => {
    fetchCall(`${import.meta.env.VITE_API_URL_BASE}clients/${client.id_cliente}`, "DELETE")
    setClients(prevData => prevData.filter(c => c.id_cliente !== client.id_cliente));
  }
  return (
    <article className="card rounded-1 overflow-hidden">
      <div className="card-body d-flex justify-content-between">
        <div>
          <p className="card-title fw-semibold mb-0">{client.nombre}</p>
          <p className="card-text text-muted mb-0">{client.email}</p>
          <p className="card-text text-muted">{client.sector}</p>
        </div>

        <div className="d-inline-flex flex-column gap-2">
          <button onClick={onDeleteClient} className="btn btn-outline-danger btn-sm">Borrar cliente</button>
          <button onClick={onEditClient} className="btn btn-dark btn-sm">Editar info</button>
        </div>
      </div>
    </article>
  )
}