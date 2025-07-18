import React from 'react'
import { useNavigate } from 'react-router';
import { HeaderHero } from '../../components/ui/HeaderHero';
import { ContactForm } from '../../components/client/ContactForm';



export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <HeaderHero
        image="https://plaguatec.com/wp-content/uploads/2022/09/cropped-plaguatec-imagotipo@4x.png"
        alt="Logotipo"
        title="Plaguatec App"
        subtitle="Expertos en control de plagas y tratamientos de aguas"
      />
      <div className="d-flex justify-content-center mb-5 pb-5">
        <button type="button" className="btn btn-dark btn-lg me-2 mb-5" onClick={() => navigate("/login")}>Login</button>
        {/* <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate("/user/my-resources")}>My collection</button> */}
      </div>
      
      <section>
        <ContactForm/>
      </section>
    </main>
  )
}
