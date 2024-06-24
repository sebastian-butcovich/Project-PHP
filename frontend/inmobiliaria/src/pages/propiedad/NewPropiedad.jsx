import { React, useState, useEffect } from "react";
import Swall from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../propiedad/css_propiedades/newP.css";
import { agregarPropiedad } from "../../utils/peticionesPropiedades";
import { pedirTipoPropiedades } from "../../utils/peticionesTipoPropiedad";
import { pedirLocalidad } from "../../utils/peticionesLocalidad";
import HeaderComponent from "../../components/HeaderComponent";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";

function NewPropiedad() {
  const navigate = useNavigate();
  const [listaLocalidad, setListaLocalidad] = useState([]);
  const [listaTipoPropiedad, setListaTipoPropiedad] = useState([]);
  const [datosSelect, setDatosSelect] = useState({
    localidad: 0,
    tipo_propiedad: 0,
  });
  const [datos, setDatos] = useState({
    domicilio: "",
    cantidad_habitaciones: 0,
    cantidad_banios: 0,
    cantidad_huespedes: 0,
    fecha_disponibilidad: "",
    cantidad_dias: 0,
    valor_noche: 0,
    imagen: "",
  });
  const [datosBool, setDatosBool] = useState({
    cochera: 0,
    disponible: 0,
  });
  const handleSelect = (event) => {
    const key = event.target.selectedOptions[0].accessKey;
    const name = event.target.name;
    console.log(key);
    setDatosSelect({
      ...datosSelect,
      [name]: key,
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

  async function mensajeEnvio(event) {
    event.preventDefault();
    let estado = await agregarPropiedad(datos, datosBool, datosSelect);
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
  }
  useEffect(() => {
    pedirDatosFaltantes();
  }, []);
  return (
    <div className="NewPropiedadPage">
      <HeaderComponent />
      <NavBarComponent />
      <h2>Crear una nueva propiedad</h2>
      <form onSubmit={mensajeEnvio} className="newPropiedadPage_formulario">
        <label>
          Domicilio:{" "}
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
          {" "}
          Localidad:
          <select name="localidad" onChange={handleSelect} required>
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
          Cantidad de habitaciones:{" "}
          <input
            type="number"
            name="cantidad_habitaciones"
            value={datos.cantidad_habitaciones}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Cantidad de baños:{" "}
          <input
            type="number"
            name="cantidad_banios"
            value={datos.cantidad_banios}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Tiene cochera:{" "}
          <input
            type="checkbox"
            name="cochera"
            value={datos.cochera}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Cantidad de huespedes:{" "}
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
          Fecha de disponibilidad{" "}
          <input
            required
            type="date"
            name="fecha_disponibilidad"
            value={datos.fecha_disponibilidad}
            onChange={handelInputChange}
          />
        </label>
        <label>
          Cantidad de dias:{" "}
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
          Disponible:{" "}
          <input
            type="checkbox"
            name="disponible"
            value={datos.disponible}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Valor Noche:{" "}
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
          <select name="tipo_propiedad" onChange={handleSelect} required>
            <option value="">Seleccione un tipo de propiedad</option>
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
          <input
            type="file"
            multiple
            name="imagen"
            value={datos.imagen}
            onChange={(evento) => {
              Array.from(evento.target.files).forEach((archivo) => {
                var reader = new FileReader();
                reader.readAsDataURL(archivo);
                reader.onload = function () {
                  var arrayAuxiliar = [];
                  var base64 = reader.result;
                  arrayAuxiliar = base64.split(",");
                  base64 = arrayAuxiliar[1];
                  setDatos({
                    ...datos,
                    imagen: base64,
                  });
                };
              });
            }}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Vovler
      </button>
      <FooterComponent />
    </div>
  );
}

export default NewPropiedad;
