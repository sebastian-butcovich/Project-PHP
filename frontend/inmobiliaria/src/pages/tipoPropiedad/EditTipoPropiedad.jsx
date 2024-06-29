import React, { useEffect, useState } from "react";
import { editarTipoPropiedades } from "../../utils/peticionesTipoPropiedad";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HeaderComponent from "../../components/HeaderComponent";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";
import "./../../css/css_pages/formulario.css";

function EditTipoPropiedad() {
  const [datos, setDatos] = useState({
    id: 0,
    nombre: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setDatos({
      id: location.state.data.id,
      nombre: location.state.data.nombre,
    });
  }, []);
  return (
    <div className="page">
      <HeaderComponent paginaActual={"Editar Tipo propiedad"} />
      <NavBarComponent />
      <div className="formulario">
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            let status = await editarTipoPropiedades(datos);
            if (status == 200) {
              Swal.fire({
                title: "Propiedad editada correctamente",
              }).then((response) => {
                if (response.isConfirmed) {
                  navigate("/tipoPropiedad");
                }
              });
            } else {
              if (status == 400) {
                Swal.fire({
                  title: "Ya hay un tipo de propiedad con ese nombre",
                });
              }
            }
          }}
        >
          <label className="label-form">
            Nombre:{" "}
          </label>
          <input
              name="nombre"
              type="text"
              min="1"
              required
              value={datos.nombre}
              onChange={(e) => {
                let { name, value } = e.target;
                console.log(datos.id);
                setDatos({
                  ...datos,
                  [name]: value,
                });
              }}
              className="input-form"
            />
          <div className="container-btn">
            <button className="btn-end-form" type="submit">Enviar</button>
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

export default EditTipoPropiedad;
