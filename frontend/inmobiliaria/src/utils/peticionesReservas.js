import Axios from 'axios'
import { obtenerPropiedades } from './peticionesPropiedades';
import { obtenerInquilinos } from './peticionesInquilinos';
import { armarArreglosReservas } from './armarArreglos';

 export async function obtenerReservas (){
    try{
        const reservas = await Axios({
            method:"get",
            url:"http://localhost:80/reservas"
        })
        const propiedades = await obtenerPropiedades();
        const inquilinos = await obtenerInquilinos();
        let peticion = armarArreglosReservas(reservas.data.OK,inquilinos,propiedades);
        return peticion;
    }
    catch(error){
        return error.response;
    } 
}
export async function editarReserva(reserva,reservaSelect){
    console.log(reservaSelect);
     try{
        const response = await Axios({
            method:"put",
            url:"http://localhost:80/reservas",
            params:{
                "id":reserva.id
            },
            data:{
                "propiedad_id":reservaSelect.propiedad_id,
                "inquilino_id":reservaSelect.inquilino_id,
                "fecha_desde":reserva.fecha_desde,
                "cantidad_noches":reserva.cantidad_noches   
            }
         })
         return response.status;
    }catch(error){
        console.log(error);
       return  error.response.status;
    } 
}
export async function eliminarReserva(id){
    try{
        const response = await Axios({
            method:"delete",
            url:"http://localhost:80/reservas",
            params:{
                id:id
            }
        })
        return response.status
    }catch(error){
        console.log(error);
        return error.response.status;
    }
}
export async function agregarReserva(reserva,reservaSelect){
    try{
        const response = await Axios(
            {
                method:"post",
                url:"http://localhost:80/reservas",
                data:{
                    "propiedad_id":reservaSelect.propiedad_id,
                    "inquilino_id":reservaSelect.inquilino_id,
                    "fecha_desde":reserva.fecha_desde,
                    "cantidad_noches":reserva.cantidad_noches
                }
            }
        ) 
        return response.status;
    } 
    catch(error){
        return error.response.status
    }

 }