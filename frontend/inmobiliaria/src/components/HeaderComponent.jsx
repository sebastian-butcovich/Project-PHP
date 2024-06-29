import React from 'react'
import './../css/css_components/Header.css'
function HeaderComponent({paginaActual}) {
  return (
    <div className="headerComponent">
      <h1 className='Titulo-principal'>Inmobiliaria</h1>
      <h2 className="Titulo-secundario">{paginaActual}</h2>
    </div>
  )
}

export default HeaderComponent