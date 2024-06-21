import axios from 'axios'
import data  from './Datos/INQUILINOS_DATA.json'

export async function agregarInquilino(inquilino){
    
        try{
            const response = await axios({
                method:"post",
               url:"http://localhost:80/inquilinos",
                data:{
                    "documento":inquilino.documento,
                    "nombre":inquilino.nombre,
                    "apellido":inquilino.last_name,
                    "email":inquilino.email,
                    "activo":inquilino.activo ? 1 : 0
                }
            })
            return response.status;
        }catch(error){
            return error.response.status;
        } 
}
export async function obtenerInquilinos(){
    try{
        const response = await axios({
            method:"get",
            url:"http://localhost:80/inquilinos",
        })
        return response.data.OK
    }catch(error)
    {
        console.log(error);
    }
} 
