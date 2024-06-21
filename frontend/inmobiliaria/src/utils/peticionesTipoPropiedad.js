import axios from 'axios'

export async function pedirTipoPropiedades(){
    let response = await axios({
        method:"get",
        url:"http://localhost:80/tipo_propiedades",
    })
    return(response.data.OK);
}

export async  function eliminarTipoPropiedad(id){
    let response = await axios({
        method:"delete",
        url:"http://localhost:80/tipo_propiedades",
        params:{
            id:id
        }
    })
    return response.status
}
export async function editarTipoPropiedades(datos){
    try{
        const response = await axios({
            method:"put",
            url:"http://localhost:80/tipo_propiedades",
            data:{
                id:datos.id,
                nombre:datos.nombre
            }
        })
        return response.status;
    }catch(error)
    {
        return error.response.status;
    }
    
}
export async function agregarTipoPropiedad(datos){
    try{
        let response = await axios({
            method:'post',
            url:"http://localhost:80/tipo_propiedades",
            data:{
                nombre:datos
            }
        })
        return response.status
    }catch(error){
        return error.response.status
    }
}