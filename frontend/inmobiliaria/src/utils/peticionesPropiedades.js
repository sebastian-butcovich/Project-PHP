import axios from "axios";
import { armarArreglos } from "./armarArreglos";

export async function agregarPropiedad(datosInput,datosCheckbox,datosSelect){
    try{
        const data = await axios({
            method:"post",
            url:"http://localhost:80/propiedades",
            data:{
                disponible:datosCheckbox.disponible,
                localidad_id:datosSelect.localidad,
                tipo_propiedad_id:datosSelect.tipo_propiedad,
                domicilio:datosInput.domicilio,
                cantidad_habitaciones:datosInput.cantidad_habitaciones,
                catidad_banios:datosInput.catidad_banios,
                cochera:datosCheckbox.cochera,
                cantidad_huespedes:datosInput.cantidad_huespedes,
                fecha_inicio_disponibilidad:datosInput.fecha_disponibilidad,
                cantidad_dias:datosInput.cantidad_dias,
                valor_noche:datosInput.valor_noche,
                imagen:datosInput.imagen,
                tipo_imagen:datosInput.tipo_imagen            
            }
        })
        return data.status;
    }catch(error){
        console.log(error);
    }

}
export async function obtenerPropiedades (fecha,cantHuespedes,disponible,localidad_id){
    try{
        const propiedades = await axios(
            {
                method:"get",
                url:"http://localhost:80/propiedades",
                params:{
                    disponible:disponible,
                    fecha_inicio_disponibilidad:fecha,
                    localidad_id:localidad_id,
                   cantidad_huespedes:cantHuespedes
                }      
                    
            }
        )
        const localidades = await axios(
            {
                method:"get",
                url:"http://localhost:80/localidades"
            }
        );
        const tipo_proiedad = await axios ({
                method:"get",
                url:"http://localhost:80/tipo_propiedades"
        })
        let p_1=[];
        if(propiedades.data.OK!=null && localidades.data.OK!=null && tipo_proiedad.data.OK != null){
             p_1=armarArreglos(propiedades.data.OK,localidades.data.OK,tipo_proiedad.data.OK);
        }  
        return p_1;
    }
    catch(error ){
        console.log(error)
    }
}
export async function buscarPropiedadDisponible(){

    const propiedades_disponibles = await axios({
        method:"get",
        url:"http://localhost:80/propiedades",
        params:{
            disponible:1
        }
    
    })

    return propiedades_disponibles.data.OK;
}
export async function editarPropiedad(datosInputText,datosInputCheckBox,datosInputSelect){
   try{
    const response = await axios({
        timeout:10000,
        method:"put",
        url:"http://localhost:80/propiedades",
        params:{
            id:datosInputText.id
        },
        data:{
                "disponible":datosInputCheckBox.disponible,
                "localidad_id":datosInputSelect.localidad,
                "tipo_propiedad_id":datosInputSelect.tipo_propiedad,
                "domicilio":datosInputText.domicilio,
                "cantidad_habitaciones":datosInputText.cantidad_habitaciones,
                "cantidad_banios":datosInputText.cantidad_banios,
                "cochera":datosInputCheckBox.cochera,
                "cantidad_huespedes":datosInputText.cantidad_huespedes,
                "fecha_inicio_disponibilidad":datosInputText.fecha_disponibilidad,
                "cantidad_dias":datosInputText.cantidad_dias,
                "valor_noche":datosInputText.valor_noche,
                "imagen":datosInputText.imagen,
                "tipo_imagen":datosInputText.tipo_imagen
        }
    })
    return(response.status);
   }catch(error)
   {
        console.log(error);
        //return error.response.status;
   }
}
export async function peticionEliminarPropiedad(id){
    const response = await axios({
        method:"delete",
        url:"http://localhost:80/propiedades/eliminar",
        params:{
            id:id
        }
    })
    return response.status;

}