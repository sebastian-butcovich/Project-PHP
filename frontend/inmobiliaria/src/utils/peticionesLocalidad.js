import axios from "axios";
export async function agregarLocalida(dato){
    const respuesta = await axios({
        method:"post",
        url:"http://localhost:80/localidades",
        data:{
            "nombre":dato.nombre
        }
    })
    return respuesta.status;
}
export async function pedirLocalidad(){
    const respuesta = await axios({
        method:"get",
        url:"http://localhost:80/localidades"
    })
    return respuesta.data.OK;
}