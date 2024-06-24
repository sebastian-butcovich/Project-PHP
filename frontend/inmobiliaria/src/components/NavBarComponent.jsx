import React from 'react'
import { Link } from 'react-router-dom'
import './../components/css/NavBar.css'
function NavBarComponent() {
  return (
    <div className="NavBar">
        <Link className="NavBar-Link" to="/" >Propiedades</Link>
        <Link className="NavBar-Link" to="/tipoPropiedad">Tipo propiedades</Link>
        <Link className="NavBar-Link" to="/reservas" >Reservas</Link>
    </div>
  )
}

export default NavBarComponent