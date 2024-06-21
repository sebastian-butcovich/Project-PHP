import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { obtenerReservas } from "../../utils/peticionesReservas";
import { getColumnsReservas } from "../../components/formatTablePropiedades";
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
    <div>
      <HeaderComponent />
      <NavBarComponent />
      <button
        onClick={() => {
          navigate("/newReserva");
        }}
      >
        Agregar una reserva
      </button>
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
