import React from 'react'
import { CheckpointsMap } from './CheckpointsMap'
import { VisitRow } from './VisitRow'

export const DetailedVisitCard = ({ 
  clientName="Nombre del cliente o empresa", 
  clientLocation="Ubicación de visita",
  clientContact="Teléfono de contacto", 
  specs="detalles de la visita a realizar", 
  workTime="2h", 
  workers="Operario 1, Operario 2"
  
}) => {
  return (
    <section className="border mx-3 pt-4 rounded 1">
      <article className="p-4 pt-0 mb-5 container justify-content-center align-items-center">
        <h3 className="fw-bold pb-3">Datos generales de la visita</h3>
        <div className="border p-3 rounded-1">
          <p><b>Cliente:</b> {clientName}</p>
          <p><b>Localización:</b> {clientLocation}</p>
          <p><b>Contacto:</b> {clientContact}</p>
          <br/>
          <p><b>Especificaciones de tarea:</b> <br/>{specs}</p>
          <p><b>Tiempo estimado de desempeño:</b> {workTime}</p>
          <p><b>Operario/s asignados:</b> {workers}</p>
        </div>
      </article>

      <article className="px-4 mb-5 pb-5 container justify-content-center align-items-center">
        <h3 className="fw-bold pb-3">Visitas anteriores</h3>
        <ul className="list-group">
          <li className="list-group-item"><VisitRow/></li>
          <li className="list-group-item"><VisitRow/></li>
          <li className="list-group-item"><VisitRow/></li>
        </ul>
      </article>
      <CheckpointsMap/>
    </section>
  )
}
