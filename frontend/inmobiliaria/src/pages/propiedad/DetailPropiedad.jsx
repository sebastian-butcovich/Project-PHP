import { React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";
import "../../css/css_pages/formulario.css";
import "../../css/css_pages/detail-propiedades.css"
import {deBase64AFile} from './../../utils/base64.js'

function DetailPropiedad() {
  const location = useLocation();
  const navigate = useNavigate();
  let data = location.state.data;

 
 
  return (
    <div className="page">
      <HeaderComponent paginaActual={"Detalles de la propiedad seleccionada"} />
      <NavBarComponent />
      <div className=" formulario">
        <div className="form">
          <ul>
            <li>
              <p className="info-detail-propiedades">Dirección: {data.domicilio}</p>
            </li>
            <li>
              <p className="info-detail-propiedades" >Localidad: {data.localidad_id}</p>
            </li>
            <li>
              <p className="info-detail-propiedades">Tipo de propiedad: {data.tipo_propiedad_id}</p>
            </li>
            <li>
              <p className="info-detail-propiedades">Fecha de disponibilidad: {data.fecha_inicio_disponibilidad}</p>
            </li>
            <li>
              <p className="info-detail-propiedades">Valor de una noche: {data.valor_noche}</p>
            </li>
            <li>
              {data.disponible == 1 ? (
                <p className="info-detail-propiedades">Esta disponible</p>
              ) : (
                <p className="info-detail-propiedades">No esta disponible</p>
              )}
            </li>
            <li>
              <p className="info-detail-propiedades">Cantidad de habitaciones: {data.cantidad_habitaciones}</p>
            </li>
            <li>
              <p className="info-detail-propiedades">Cantidad de baños: {data.cantidad_banios}</p>
            </li>
            <li>
              {data.cochera == 1 ? (
                <p className="info-detail-propiedades">Tiene cochera</p>
              ) : (
                <p className="info-detail-propiedades">No tiene cochera</p>
              )}
            </li>
            <li>
              <p className="info-detail-propiedades">Cantidad de huespedes: {data.cantidad_huespedes}</p>
            </li>
            <li>
              <p className="info-detail-propiedades">Cantidad de dias que esta disponible: {data.cantidad_dias}</p>
            </li>
            <li><img className="img" src={`${data.tipo_imagen},${data.imagen}`} alt="imagen de la propiedad" /></li>
            <li ><p className="info-detail-propiedades">{data.tipo_imagen}</p></li>
          </ul>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="btn-end-form"
          >
            Volver
          </button>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default DetailPropiedad;
