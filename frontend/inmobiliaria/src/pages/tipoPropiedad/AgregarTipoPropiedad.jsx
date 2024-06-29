import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarTipoPropiedad } from "../../utils/peticionesTipoPropiedad";
import Swal from "sweetalert2";
import HeaderComponent from '../../components/HeaderComponent'
import NavBarComponent from '../../components/NavBarComponent'
import FooterComponent from '../../components/FooterComponent'
import './../../css/css_pages/formulario.css'

function AgregarTipoPropiedad() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState("");
  return (
    <div>
      <HeaderComponent paginaActual={"Agregar un nuevo tipo de propiedad"}/>
      <NavBarComponent/>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let response = await agregarTipoPropiedad(datos);
          if (response == 200) {
            Swal.fire({
              title: "Se ingreso la propiedad correctamente",
            }).then((res) => {
              if (res.isConfirmed) {
                navigate("/tipoPropiedad");
              }
            });
          } else {
            if (response == 400) {
              Swal.fire({
                title: "Ya existe una propiedad con ese nombre",
              });
            }
          }
        }}
      >
        <label>
          Nombre:{" "}
          <input
            type="text"
            onChange={(e) => {
              setDatos(e.target.value);
            }}
          />
        </label>
        <input type="submit" content="Agregar" />
      </form>
      <button
        onClick={() => {
          navigate("/tipoPropiedad");
        }}
      >
        Volver
      </button>
      <FooterComponent/>
    </div>
  );
}

export default AgregarTipoPropiedad;
