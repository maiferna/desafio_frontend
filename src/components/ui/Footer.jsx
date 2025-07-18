import React from 'react'

export const Footer = () => {
  return (
  <footer className="footer mt-auto py-3 bg-light fixed-bottom">
    <div className="container">
        <div className="row">
            <div className="col-md-6 text-center text-md-start">
                <span className="text-muted">&copy; 2025 Plaguatec. All rights reserved.</span>
            </div>
            <div className="col-md-6 text-center text-md-end">
                <ul className="list-inline mb-0">
                    <li className="list-inline-item"><a href="#" className="text-muted">Política de privacidad</a></li>
                    <li className="list-inline-item"><a href="#" className="text-muted">Términos de uso</a></li>
                    <li className="list-inline-item"><a href="#" className="text-muted">Contacto</a></li>
                </ul>
            </div>
        </div>
    </div>
  </footer>
  )
}