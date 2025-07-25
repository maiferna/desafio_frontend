import { WorkerRow } from './WorkerRow';
import { useFetch } from "../../../hooks/useFetch";
import { fetchCall } from "../../../utils/fetchCall";
const urlBase = import.meta.env.VITE_API_URL_BASE;

export const WorkersList = ({ setUserToEdit }) => {
  const {
    data,
    loading,
    error,
    setData: setWorkers // <- importante para actualizar la lista tras borrar
  } = useFetch(`${urlBase}users`);

  if (loading) return <p>Cargando operarios...</p>;
  if (error) return <p>Error al cargar los operarios: {error}</p>;

  // Filtrar usuarios con rol técnico
  const tecnicos = data.filter(user => user.role === 'tecnico');

  const handleDelete = async (id_usuario) => {
    const confirm = window.confirm("¿Estás seguro de borrar este operario?");
    if (!confirm) return;

    try {
      await fetchCall(`${urlBase}users/${id_usuario}`, "DELETE");

      // Filtrar el eliminado y actualizar la lista en pantalla
      const nuevosTecnicos = tecnicos.filter(user => user.id_usuario !== id_usuario);
      setWorkers(nuevosTecnicos);

    } catch (err) {
      console.error("Error al borrar operario:", err);
      alert("No se pudo eliminar el operario.");
    }
  };

  return (
    <section className='my-5 pb-5 mx-5'>
      <h3 className="fw-bold my-4 px-sm-1 px-md-0">Lista de operarios</h3>
      <div className="d-flex row g-0 mb-5">
        {tecnicos.map((user) => (
          <WorkerRow
            key={user.id_usuario}
            nombre={user.nombre}
            id={user.id_usuario}
            department={user.role}
            onEdit={() => setUserToEdit(user)}
            onDelete={() => handleDelete(user.id_usuario)}
          />
        ))}
      </div>
    </section>
  );
};
