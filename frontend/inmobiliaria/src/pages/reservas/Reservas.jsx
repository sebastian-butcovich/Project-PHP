import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { obtenerReservas } from "../../utils/peticionesReservas";
import { getColumnsReservas } from "../../utils/formatTablePropiedades";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { eliminarReserva } from "../../utils/peticionesReservas";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";

function Reservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const columns = getColumnsReservas;
  async function obtenerTabla() {
    let reser = await obtenerReservas();
    setReservas(reser);
  }
  useEffect(() => {
    obtenerTabla();
  }, []);
  return (
    <div className="page">
      <HeaderComponent paginaActual={"Reservas"} />
      <NavBarComponent />
      <div className="container-btn-top-page">
      <button
        onClick={() => {
          navigate("/newReserva");
        }}
        className="btn-top-page"
      >
        Agregar una reserva
      </button>
      </div>
      <Table
        data={reservas}
        columns={columns}
        funcionEliminar={eliminarReserva}
        condicion={false}
        paginaEditar={"/editReserva"}
        obtenerData={obtenerTabla}
      />
      <FooterComponent />
    </div>
  );
}

export default Reservas;
