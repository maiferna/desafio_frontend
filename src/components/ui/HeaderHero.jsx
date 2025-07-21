import React from 'react'

export const HeaderHero = ({title = "Título", subtitle = "Subtítulo", image=null, alt=null}) => {
  return (
    <header className="d-flex flex-column justify-content-center align-items-center text-center mt-5 mb-4 pt-5">
        <div>
            <img src={image} alt={alt} className="img-fluid w-50 mb-2 mt-5"/>
        </div>
        <h1 className="fw-bold">{title}</h1>
        <h2 className="fw-medium fs-4 px-5 mx-2">{subtitle}</h2>
    </header>
  )
}