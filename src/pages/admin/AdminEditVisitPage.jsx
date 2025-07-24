import React from 'react'
import { EditVisit } from '../../components/admin/EditVisit';
import { useParams } from 'react-router';
import { HeaderHero } from '../../components/ui/HeaderHero';

export const AdminEditVisitPage = () => {
  const { id } = useParams();
  return (
    <main>
      <HeaderHero
        title="Gestión de visitas"
        subtitle="Editar visita"
      />
      <EditVisit id={id} />
    </main>
  )
}
