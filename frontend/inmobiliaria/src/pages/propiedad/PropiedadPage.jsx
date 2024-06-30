import { React, useEffect, useState } from "react";
import Table from "../../components/Table";
import {
  obtenerPropiedades,
  peticionEliminarPropiedad,
} from "../../utils/peticionesPropiedades";
import { getFormat } from "../../utils/formatTablePropiedades";
import { useNavigate } from "react-router-dom";
import { pedirLocalidad } from "../../utils/peticionesLocalidad";
import NavBarComponent from "../../components/NavBarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import "./../../css/css_components/Footer.css";
import "./../../css/css_pages/search-propiedades.css"
import "./../../css/css_pages/generalPages.css"

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
    <div className="page">
      <HeaderComponent paginaActual={"Lista de propiedades"} />
      <NavBarComponent />
      <div className="search-propiedades">
        <label className="search-propiedades-label">Propiedades disponibles</label>
        <input
          type="checkbox"
          name="disponible"
          onChange={(event) => {
            event.target.checked ? setDisponible(1) : setDisponible(0);
          }}
          className="search-propiedades-input"
        />
        <label className="search-propiedades-label">Localidad</label>
        <select
          name="localidad"
          onChange={(event) => {
            setLocalidadId(event.target.selectedOptions[0].accessKey);
          }}
          className="search-propiedades-input"
        >
          <option value="">Selecciona una localidad</option>
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
        <label className="search-propiedades-label">Fecha inicio</label>{" "}
        <input
          type="date"
          onChange={(event) => {
            setFecha(event.target.value);
            obtenerTabla();
          }}
          name="fecha_inicio_disponibilidad"
          value={fecha}
          autoComplete="of"
          className="search-propiedades-input"
        />
        <label className="search-propiedades-label">Cantidad de huespedes</label>
        <input
          type="number"
          name="cantidad_huespedes"
          onChange={(event) => {
            setCantHuespedes(event.target.value);
          }}
          className="search-propiedades-input"
        />
        <button className="search-propiedades-bottom search-propiedades-bottom-search" onClick={obtenerTabla}>Buscar</button>
        <button
          onClick={() => {
            navigate("newPropiedad");
          }}
          className="search-propiedades-bottom search-propiedades-bottom-new"
        >
          Agregar una nueva propiedad
        </button>
      </div>
      <Table
        data={data}
        columns={columns}
        condicion={true}
        funcionEliminar={peticionEliminarPropiedad}
        paginaEditar={"/editarPropiedad"}
        obtenerData={obtenerTabla}
      />
      <FooterComponent className="footer" />
    </div>
  );
}

export default PropiedadPage;
