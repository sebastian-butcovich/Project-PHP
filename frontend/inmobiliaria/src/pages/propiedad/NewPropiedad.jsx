import { React, useState, useEffect } from "react";
import Swall from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { agregarPropiedad } from "../../utils/peticionesPropiedades";
import { pedirTipoPropiedades } from "../../utils/peticionesTipoPropiedad";
import { pedirLocalidad } from "../../utils/peticionesLocalidad";
import HeaderComponent from "../../components/HeaderComponent";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";
import "./../../css/css_pages/formulario.css";

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
    <div className="pages">
      <HeaderComponent paginaActual={"Agregar una nueva propiedad"} />
      <NavBarComponent />
      <div className="formulario">
        <form onSubmit={mensajeEnvio} className="form">
          <label className="label-form">
            <span>Domicilio:</span>
          </label>
          <input
            required
            type="text"
            min="1"
            placeholder="domicilio"
            name="domicilio"
            value={datos.domicilio}
            onChange={handelInputChange}
            className="input-form"
          />
          <label className="label-form"> Localidad:</label>
          <select
            className="input-form"
            name="localidad"
            onChange={handleSelect}
            required
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
          <label className="label-form">Cantidad de habitaciones: </label>
          <input
            className="input-form"
            type="number"
            name="cantidad_habitaciones"
            value={datos.cantidad_habitaciones}
            onChange={handelInputChange}
          />
          <label className="label-form">Cantidad de baños: </label>
          <input
            type="number"
            name="cantidad_banios"
            value={datos.cantidad_banios}
            onChange={handelInputChange}
            className="input-form"
          />
          <label className="label-form">Cantidad de huespedes: </label>
          <input
            min="1"
            required
            type="number"
            name="cantidad_huespedes"
            value={datos.cantidad_huespedes}
            onChange={handelInputChange}
            className="input-form"
          />
          <label className="label-form">Fecha de disponibilidad </label>
          <input
            required
            type="date"
            name="fecha_disponibilidad"
            value={datos.fecha_disponibilidad}
            onChange={handelInputChange}
            className="input-form"
          />
          <label className="label-form">Cantidad de dias: </label>
          <input
            min="1"
            required
            type="number"
            name="cantidad_dias"
            value={datos.cantidad_dias}
            onChange={handelInputChange}
            className="input-form"
          />
          <label className="label-form">Valor Noche: </label>
          <input
            required
            min="1"
            type="number"
            name="valor_noche"
            value={datos.valor_noche}
            onChange={handelInputChange}
            className="input-form"
          />
          <label className="label-form">Que tipo de propiedad es:</label>
          <select
            name="tipo_propiedad"
            onChange={handleSelect}
            required
            className="input-form"
          >
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
          <div className="container-input-end">
            <label className="label-form">
              Disponible:{" "}
              <input
                type="checkbox"
                name="disponible"
                value={datos.disponible}
                onChange={handleCheckboxChange}
              />
            </label>

            <label className="label-form">
              Tiene cochera:{" "}
              <input
                type="checkbox"
                name="cochera"
                value={datos.cochera}
                onChange={handleCheckboxChange}
              />
            </label>
            <label className="label-form">
              imagen de la propiedad:{" "}
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
          </div>
          <div className="container-btn">
            <button className="btn-end-form" type="submit">
              Enviar
            </button>
            <button
              className="btn-end-form"
              onClick={() => {
                navigate("/");
              }}
            >
              Vovler
            </button>
          </div>
        </form>
      </div>
      <FooterComponent />
    </div>
  );
}

export default NewPropiedad;
