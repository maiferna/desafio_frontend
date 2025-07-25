import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
