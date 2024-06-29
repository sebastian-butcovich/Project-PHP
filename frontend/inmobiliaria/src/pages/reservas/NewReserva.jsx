import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { useNavigate } from "react-router-dom";
import { obtenerInquilinos } from "../../utils/peticionesInquilinos";
import axios from "axios";
import Swal from "sweetalert2";
import { agregarReserva } from "../../utils/peticionesReservas";
import FooterComponent from "../../components/FooterComponent";
import './../../css/css_pages/formulario.css'


function NewReserva() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState({
    cantidad_noches: 0,
    fecha_desde: "",
  });
  const [reservaSelect, setReservaSelect] = useState({
    propiedad_id: 0,
    inquilino_id: 0,
  });
  const [propiedades, setPropiedades] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);

  async function obtenerInformacionSelect() {
    try {
      const responsePropiedades = await axios({
        method: "get",
        url: "http://localhost:80/propiedades",
      });
      setPropiedades(responsePropiedades.data.OK);
      const responseInquilinos = await obtenerInquilinos();
      setInquilinos(responseInquilinos);
    } catch {
      (error) => console.log(error);
    }
  }
  useEffect(() => {
    obtenerInformacionSelect();
  }, []);
  function handleReservaSelect(event) {
    const name = event.target.name;
    const value = event.target.selectedOptions[0].accessKey;
    setReservaSelect({
      ...reservaSelect,
      [name]: value,
    });
  }
  function hadleReserva(event) {
    const { name, value } = event.target;
    setReservas({
      ...reservas,
      [name]: value,
    });
  }
  async function enviarInformacion() {
    let response = await agregarReserva(reservas, reservaSelect);
    console.log(response);
    if (response == 200) {
      Swal.fire({
        title: "Se ingreso la reserva correctamente",
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          navigate("/reservas");
        }
      });
    }
    if (response == 400) {
      Swal.fire({
        title:
          "No se pudo ingresar la reserva. El error puede deverse a los siguientes casos:",
        text:
          "1 No ingreso todos los campos necesarios. " +
          "2 la propiedad seleccionada no esta disponible en este momento." +
          " 3 El inquilino no esta activo",
      });
    }
    if (response == 404) {
      Swal.fire({
        title:
          "No se pudo ingresar la reserva porque no se encuentra uno de los siguientes datos:",
        text:
          "1 No se encontro la propiedad con" + "2. No se econtro el inquilino",
      });
    }
  }

  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />
      <div className="formulario">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          enviarInformacion();
        }}
        className="form"
      >
        <label className="label-form">
          Domicilio:{" "}
        </label>
        <select className="input-form" name="propiedad_id" required onChange={handleReservaSelect}>
            <option>Seleccione un propiedad</option>
            {propiedades.length != 0 ? (
              propiedades.map((element) => (
                <option accessKey={element.id} key={element.id}>
                  {element.domicilio}
                </option>
              ))
            ) : (
              <option>Seleccione un propiedad</option>
            )}
          </select>
        <label className="label-form">
          Inquilino:{" "}
        </label>
        <select className="input-form" name="inquilino_id" required onChange={handleReservaSelect}>
            <option>Seleccione un inquilino</option>
            {inquilinos.map((element) => (
              <option key={element.id} accessKey={element.id}>
                {element.nombre + " " + element.apellido}
              </option>
            ))}
          </select>
        <label className="label-form">
          Fecha desde:{" "}
        </label>
        <input
            required
            type="date"
            name="fecha_desde"
            onChange={hadleReserva}
            className="input-form"
          />
        <label className="label-form">
          Cantidad de noches:{" "}
        </label>
        <input
            required
            type="number"
            name="cantidad_noches"
            onChange={hadleReserva}
            className="input-form"
          />
        <div className="container-btn">
        <button className="btn-end-form" type="submit">Enviar</button>
        <button
        onClick={() => {
          navigate("/reservas");
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

export default NewReserva;
