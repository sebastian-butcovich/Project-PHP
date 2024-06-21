import { React, useEffect, useState } from "react";
import Table from "../../components/Table";
import {
  obtenerPropiedades,
  peticionEliminarPropiedad,
} from "../../utils/peticionesPropiedades";
import { getFormat } from "../../components/formatTablePropiedades";
import { useNavigate } from "react-router-dom";
import { pedirLocalidad } from "../../utils/peticionesLocalidad";
import NavBarComponent from "../../components/NavBarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";

function PropiedadPage() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [fecha, setFecha] = useState("");
  const [cantHuespedes, setCantHuespedes] = useState(0);
  const [localidadId, setLocalidadId] = useState(0);
  const [disponible, setDisponible] = useState(0);

  async function obtenerTabla() {
    const d = await obtenerPropiedades(
      fecha,
      cantHuespedes,
      disponible,
      localidadId
    );
    setData(d);
  }
  async function getLocalidades() {
    const local = await pedirLocalidad();
    setLocalidades(local);
  }
  useEffect(() => {
    const columnas = getFormat();
    setColumns(columnas);
    obtenerTabla();
    getLocalidades();
  }, []);

  return (
    <>
      <HeaderComponent />
      <NavBarComponent />
      <label>Propiedades disponibles</label>
      <input
        type="checkbox"
        name="disponible"
        onChange={(event) => {
          event.target.checked ? setDisponible(1) : setDisponible(0);
        }}
      />
      <label>Localidad</label>
      <select
        name="localidad"
        onChange={(event) => {
          setLocalidadId(event.target.selectedOptions[0].accessKey);
        }}
      >
        <option value="">Selecciona un pais</option>
        {localidades.length == 0 ? (
          <option>Nada para mostrar</option>
        ) : (
          localidades.map((localidad) => (
            <option key={localidad.id} accessKey={localidad.id}>
              {localidad.nombre}
            </option>
          ))
        )}
      </select>
      <label>Fecha inicio</label>{" "}
      <input
        type="date"
        onChange={(event) => {
          setFecha(event.target.value);
          obtenerTabla();
        }}
        name="fecha_inicio_disponibilidad"
        value={fecha}
        autoComplete="of"
      />
      <label>Cantidad de huespedes</label>
      <input
        type="number"
        name="cantidad_huespedes"
        onChange={(event) => {
          setCantHuespedes(event.target.value);
        }}
      />
      <button onClick={obtenerTabla}>Buscar</button>
      <button
        onClick={() => {
          navigate("newPropiedad");
        }}
      >
        Agregar una nueva propiedad
      </button>
      <Table
        data={data}
        columns={columns}
        condicion={true}
        funcionEliminar={peticionEliminarPropiedad}
        paginaEditar={"/editarPropiedad"}
        obtenerData={obtenerTabla}
      />
      <FooterComponent />
    </>
  );
}

export default PropiedadPage;
