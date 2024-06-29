import React, { useEffect, useState } from "react";
import { getFormatTableTipoPropiedad } from "../../components/formatTablePropiedades";
import Table from "../../components/Table";
import {
  pedirTipoPropiedades,
  eliminarTipoPropiedad,
} from "../../utils/peticionesTipoPropiedad";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "../../components/NavBarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent"

function TipoPropiedadPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const columns = getFormatTableTipoPropiedad;
  async function obtenerTabla() {
    let response = await pedirTipoPropiedades();
    setData(response);
  }
  useEffect(() => {
    obtenerTabla();
  }, []);
  return (
    <div>
      <HeaderComponent paginaActual={"Tipo propiedad"}/>
      <NavBarComponent />
      <button
        onClick={() => {
          navigate("/newTipoPropiedad");
        }}
      >
        Agregar una nuevo tipo de propiedad
      </button>
      <Table
        data={data}
        columns={columns}
        condicion={false}
        funcionEliminar={eliminarTipoPropiedad}
        paginaEditar={"/editarTipoPropiedad"}
        paginaRetorno={obtenerTabla}
      />
      <FooterComponent/>
    </div>
  );
}
export default TipoPropiedadPage;
