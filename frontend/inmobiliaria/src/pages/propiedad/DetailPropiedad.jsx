import { React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";

function DetailPropiedad() {
  const location = useLocation();
  const navigate = useNavigate();
  let data = location.state.data;
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />
      <h2>Detalles de la propiedad seleccionada</h2>
      <ul>
        <li>
          <p>Dirección: {data.domicilio}</p>
        </li>
        <li>
          <p>Localidad: {data.localidad_id}</p>
        </li>
        <li>
          <p>Tipo de propiedad: {data.tipo_propiedad_id}</p>
        </li>
        <li>
          <p>Fecha de disponibilidad: {data.fecha_inicio_disponibilidad}</p>
        </li>
        <li>
          <p>Valor de una noche: {data.valor_noche}</p>
        </li>
        <li>
          {data.disponible == 1 ? (
            <p>Esta disponible</p>
          ) : (
            <p>No esta disponible</p>
          )}
        </li>
        <li>
          <p>Cantidad de habitaciones: {data.cantidad_habitaciones}</p>
        </li>
        <li>
          <p>Cantidad de baños: {data.cantidad_banios}</p>
        </li>
        <li>
          {data.cochera == 1 ? <p>Tiene cochera</p> : <p>No tiene cochera</p>}
        </li>
        <li>
          <p>Cantidad de huespedes: {data.cantidad_huespedes}</p>
        </li>
        <li>
          <p>Cantidad de dias que esta disponible: {data.cantidad_dias}</p>
        </li>
        <li>{data.imagen}</li>
        <li>{data.tipo_imagen}</li>
      </ul>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Volver
      </button>
      <FooterComponent/>
    </div>
  );
}

export default DetailPropiedad;
