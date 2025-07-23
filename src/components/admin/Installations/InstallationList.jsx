
import { InstallationRow } from './InstallationRow'


export const InstallationList = ({installations, setInstallations}) => {
  console.log("Installations:", installations);
  return (
    <section className='my-5 py-5 mx-5'>
            <h3 className="fw-bold my-4 px-sm-1 px-md-0">Lista de instalaciones</h3>
            <div>
                {installations.map(installation => <InstallationRow installation={installation} setInstallations={setInstallations} key={installation.id_instalacion} />)}
            </div>
        </section>
  )
}