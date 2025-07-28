import React, { useEffect, useState } from 'react'
import { InstallationMap } from './InstallationMap'
import { ServiceFormRenderer } from '../admin/ServiceFormRenderer';
import { fetchCall } from '../../utils/fetchCall';

export const CreateReportForm = ({ id }) => {
  const [visitData, setVisitData] = useState(null);
  const [serviceExecutions, setServiceExecutions] = useState([]);
  const [selectedServicios, setSelectedServicios] = useState([]);


  useEffect(() => {
    const load = async () => {
      const { data: visit } = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}visits/details/${id}`);
      const executions = await fetchCall(`${import.meta.env.VITE_API_URL_BASE}service-executions/visit/${id}`);
      setVisitData(visit);
      const serviciosConDatos = executions.map(exec => ({
        id_servicio: exec.id_servicio,
        executionId: exec.id_ejecucion_servicio,
        id_visita: exec.id_visita,
        data: exec.datos || {},
        observaciones: exec.observaciones || "",
      }));
      setSelectedServicios(serviciosConDatos);
      setServiceExecutions(executions);
      console.log({ selectedServicios })
    };
    load();
  }, [id]);

  const handleFormChange = (serviceId, formData) => {
    setSelectedServicios(prev =>
      prev.map(s =>
        s.id_servicio === serviceId ? { ...s, data: formData } : s
      )
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    for (const { id_servicio, data, executionId, observaciones, id_visita } of selectedServicios) {
      await fetchCall(`${import.meta.env.VITE_API_URL_BASE}service-executions/${executionId}`, "PUT", {}, {
        id_visita: id_visita,
        id_servicio: id_servicio,
        datos: data,
        observaciones
      });
    }

    alert("Datos de la visita actualizados");
  };

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center mb-5 pb-4 px-4">
      <form 
        className="w-100 my-4 p-4 px-4 border rounded-1"
        onSubmit={handleSubmit}
      >
        <h3 className="fw-bold mb-2 fs-1">Informe de visita</h3>
        {visitData && (
          <p className="fs-4 mb-4"><strong>Instalación:</strong> {visitData.instalacion?.direccion}</p>
        )}
        {selectedServicios.map(({ id_servicio, executionId, data }) => (
          <div key={executionId}>
            <h4 className="fw-bold mb-2 fs-5">Servicio {id}</h4>
            <ServiceFormRenderer
              serviceId={id_servicio}
              initialValues={data}
              onFormChange={(formData) => handleFormChange(id_servicio, formData)}
            />
          </div>
        ))}


        <InstallationMap visit={visitData} />

        <button className="w-100 btn btn-dark btn-lg mt-4"type="submit">Guardar datos de visita</button>
      </form>
    </section>
  );
}

