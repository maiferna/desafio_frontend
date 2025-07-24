import React from 'react'

export const ClientProfileCard = ({
    name="Empresa SL.", 
    description="Tipo de actividad/ negocio",
    adress="C/NombreCalle, 15, Planta X", 
    CP="00000 Ciudad, España",
    tfn="945 000 000", 
    email="empresa@email.com", password="*********"}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center mb-5 pb-5">
      <article className="w-100 card border-0 shadow-lg rounded-1 pb-5 mb-5 px-4 mx-3 mt-3">
        <div className="card-body text-left">
          <div className="my-4">
            <img 
              src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" 
              alt="ProfilePic" 
              className="rounded-1 img-fluid"
              style={{ width: '160px', height: '160px', objectFit: 'cover' }}
            />
          </div>

          <p className="card-title fs-2 fw-bold mb-2">{name}</p>

          <p className="card-text text-muted mb-3 fs-5 fw-medium">{description}</p>
          <p className="card-text text-muted mb-1">{adress}</p>
          <p className="card-text text-muted mb-1">{CP}</p>

          <p className="card-text text-muted fw-bold mt-4 mb-1">Información de contacto</p>
          <p className="card-text text-muted mb-1">Tfn: {tfn}</p>
          <p className="card-text text-muted mb-1">Email: {email}</p>
          <p className="card-text text-muted">{password}</p>
        </div>
      </article>
    </div>
  )
}
