
import { AllGraphic } from './Graphics/AllGraphics'

export const Graphics = () => {
  return (
    <section className="d-flex flex-column align-items-center">
      <h3 className="fw-bold">Estadísticas de la empresa</h3>
      <div>
        <AllGraphic />
        <img className="img-fluid" src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" />
      </div>
    </section>
  )
}
