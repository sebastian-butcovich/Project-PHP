import { React, useState, useEffect } from "react";
import Swall from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import "../propiedad/css_propiedades/newP.css";
import {
  agregarPropiedad,
  editarPropiedad,
} from "../../utils/peticionesPropiedades";
import { pedirTipoPropiedades } from "../../utils/peticionesTipoPropiedad";
import { pedirLocalidad } from "../../utils/peticionesLocalidad";
import { buscarIdEnArreglo } from "../../utils/armarArreglos";
import HeaderComponent from "../../components/HeaderComponent";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";

function EditPropiedad() {
  const navigate = useNavigate();
  const location = useLocation();
  const [listaLocalidad, setListaLocalidad] = useState([]);
  const [listaTipoPropiedad, setListaTipoPropiedad] = useState([]);
  const data = location.state.data;
  const [datosSelect, setDatosSelect] = useState({
    localidad: 0,
    tipo_propiedad: 0,
  });
  const [datosSelectInput, setDatosSelectInput] = useState({
    localidad: data.localidad_id,
    tipo_propiedad: data.tipo_propiedad_id,
  });
  const [datos, setDatos] = useState({
    id: data.id,
    domicilio: data.domicilio,
    cantidad_habitaciones: data.cantidad_habitaciones,
    cantidad_banios: data.cantidad_banios,
    cantidad_huespedes: data.cantidad_huespedes,
    fecha_disponibilidad: data.fecha_inicio_disponibilidad,
    cantidad_dias: data.cantidad_dias,
    valor_noche: data.valor_noche,
    imagen: "",
  });
  const [datosBool, setDatosBool] = useState({
    cochera: data.cochera,
    disponible: data.disponible,
  });
  const [datosCheckInput, setDatosCheckInput] = useState({
    cochera: data.cochera == 1 ? true : false,
    disponible: data.disponible == 1 ? true : false,
  });
  const handleSelect = (event) => {
    const key = event.target.selectedOptions[0].accessKey;
    const name = event.target.name;
    setDatosSelect({
      ...datosSelect,
      [name]: key,
    });
    let value = event.target.value;
    setDatosSelectInput({
      ...datosSelectInput,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let valor = null;
    if (checked) {
      valor = 1;
    } else {
      valor = 0;
    }
    setDatosCheckInput({
      ...datosCheckInput,
      [name]: checked,
    });
    setDatosBool({
      ...datosBool,
      [name]: valor,
    });
  };
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setDatos({
      ...datos,
      [name]: value,
    });
  };
  async function mensajeEditar(event) {
    event.preventDefault();
    let estado = await editarPropiedad(datos, datosBool, datosSelect);
    console.log(estado);
    if (estado == 200)
      Swall.fire({
        title: "Se ingreso la propiedad",
        confirmButtonText: "OK",
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/");
        }
      });
    else {
      Swall.fire({
        title: "No se ingreso la propiedad",
        confirmButtonText: "OK",
      });
    }
  }
  async function pedirDatosFaltantes() {
    var responseTipoPropiedad = await pedirTipoPropiedades();
    setListaTipoPropiedad(responseTipoPropiedad);
    var responseLocalidad = await pedirLocalidad();
    setListaLocalidad(responseLocalidad);
    setDatosSelect({
      localidad: buscarIdEnArreglo(responseLocalidad, data.localidad_id),
      tipo_propiedad: buscarIdEnArreglo(
        responseTipoPropiedad,
        data.tipo_propiedad_id
      ),
    });
  }

  useEffect(() => {
    pedirDatosFaltantes();
  }, []);
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />
      <h2>Editar propiedad</h2>
      <form onSubmit={mensajeEditar} className="newPropiedadPage_formulario">
        <label>
          Domicilio:
          <input
            required
            type="text"
            min="1"
            placeholder="domicilio"
            name="domicilio"
            value={datos.domicilio}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Localidad:
          <select
            name="localidad"
            onChangeCapture={handleSelect}
            value={datosSelectInput.localidad}
          >
            <option value="">Selecciona una campo</option>
            {listaLocalidad.length === 0 ? (
              <option>Nada para mostrar</option>
            ) : (
              listaLocalidad.map((element) => (
                <option accessKey={element.id} key={element.id}>
                  {element.nombre}
                </option>
              ))
            )}
          </select>
        </label>
        <label>
          Cantidad de habitaciones:
          <input
            type="number"
            name="cantidad_habitaciones"
            value={datos.cantidad_habitaciones}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Cantidad de baños:
          <input
            type="number"
            name="cantidad_banios"
            value={datos.cantidad_banios}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Tiene cochera:
          <input
            type="checkbox"
            name="cochera"
            onChange={handleCheckboxChange}
            checked={datosCheckInput.cochera}
          />
        </label>
        <label>
          Cantidad de huespedes:
          <input
            min="1"
            required
            type="number"
            name="cantidad_huespedes"
            value={datos.cantidad_huespedes}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Fecha de disponibilidad
          <input
            required
            type="date"
            name="fecha_disponibilidad"
            value={datos.fecha_disponibilidad}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Cantidad de dias:
          <input
            min="1"
            required
            type="number"
            name="cantidad_dias"
            value={datos.cantidad_dias}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Disponible:
          <input
            type="checkbox"
            name="disponible"
            checked={datosCheckInput.disponible}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Valor Noche:
          <input
            required
            min="1"
            type="number"
            name="valor_noche"
            value={datos.valor_noche}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Que tipo de propiedad es:
          <select
            name="tipo_propiedad"
            onChangeCapture={handleSelect}
            value={datosSelectInput.tipo_propiedad}
          >
            <option>Seleccione un tipo de propiedad</option>
            {listaTipoPropiedad.length === 0 ? (
              <option>Nada para mostrar</option>
            ) : (
              listaTipoPropiedad.map((element) => (
                <option accessKey={element.id} key={element.id}>
                  {element.nombre}
                </option>
              ))
            )}
          </select>
        </label>
        <label>
          Cargue una imagen de la propiedad:{" "}
          <input type="file" name="imagen" onChange={handelInputChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Volver a la tabla
      </button>
      <FooterComponent />
    </div>
  );
}

export default EditPropiedad;
