export const HeaderHero = ({title = "Título"}) => {
  return (
    <header className="d-flex flex-column justify-content-center align-items-center text-center mt-5 mb-4 pt-5">
      <h1 className="fw-bold mt-5">{title}</h1>
    </header>
  )
}