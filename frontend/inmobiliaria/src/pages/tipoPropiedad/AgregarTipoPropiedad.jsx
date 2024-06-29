import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarTipoPropiedad } from "../../utils/peticionesTipoPropiedad";
import Swal from "sweetalert2";
import HeaderComponent from "../../components/HeaderComponent";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";
import "./../../css/css_pages/formulario.css";

function AgregarTipoPropiedad() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState("");
  return (
    <div>
      <HeaderComponent paginaActual={"Agregar un nuevo tipo de propiedad"} />
      <NavBarComponent />
      <div className="formulario">
        <form
          className="form"
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
          <label className="label-form">Nombre: </label>
          <input
            type="text"
            onChange={(e) => {
              setDatos(e.target.value);
            }}
            className="input-form"
          />
         <div className="container-btn">
         <button type="submit" className="btn-end-form">Agregar</button>
          <button
            onClick={() => {
              navigate("/tipoPropiedad");
            }}
            className="btn-end-form"
          >
            Volver
          </button>
         </div>
        </form>
      </div>
      <FooterComponent />
    </div>
  );
}

export default AgregarTipoPropiedad;
