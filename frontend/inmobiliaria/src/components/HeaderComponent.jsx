import React from 'react'
import '../components/css/Header.css'
function HeaderComponent({paginaActual}) {
  return (
    <div className="headerComponent">
      <h1 className='Titulo-principal'>Inmobiliaria</h1>
      <h2>{paginaActual}</h2>
    </div>
  )
}

export default HeaderComponent