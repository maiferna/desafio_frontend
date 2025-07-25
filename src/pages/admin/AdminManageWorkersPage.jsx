import { useState } from 'react';
import { RegisterForm } from '../../components/admin/RegisterForm';
import { WorkersList } from '../../components/admin/Workers/WorkersList';
import { HeaderHero } from '../../components/ui/HeaderHero';

export const AdminManageWorkersPage = () => {
  const [userToEdit, setUserToEdit] = useState(null);

  return (
    <main>
      <HeaderHero title="Gestionar operarios" subtitle="" />
      <RegisterForm userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
      <WorkersList setUserToEdit={setUserToEdit} />
    </main>
  );
};
