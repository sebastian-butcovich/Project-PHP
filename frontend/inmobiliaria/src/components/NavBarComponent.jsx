import React from 'react'
import { Link } from 'react-router-dom'
function NavBarComponent() {
  return (
    <div>
        <Link to="/" >Propiedades</Link>
        <Link to="/tipoPropiedad">Tipo propiedades</Link>
        <Link to="/reservas" >Reservas</Link>
    </div>
  )
}

export default NavBarComponent