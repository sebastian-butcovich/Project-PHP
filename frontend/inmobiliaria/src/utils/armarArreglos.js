export function armarArreglos(propiedades, localidades,tipo_propiedad) {
    let nombreLocalidad = null;
    let nombreTipoPropiedad = null; 
    for (let i = 0; i < propiedades.length; i++) {
        let id_localidad = propiedades[i].localidad_id;
        let id_tipo_propiedad = propiedades[i].tipo_propiedad_id;
        for (let j = 0; j < localidades.length; j++) {
            if (id_localidad == localidades[j].id) {
                nombreLocalidad = localidades[j].nombre;
                break;
            }
        }
        propiedades[i].localidad_id = nombreLocalidad;
        for(let j=0;j<tipo_propiedad.length; j++){
            if(id_tipo_propiedad == tipo_propiedad[j].id){
                nombreTipoPropiedad = tipo_propiedad[j].nombre;
                break;
            }
        }
        propiedades[i].tipo_propiedad_id = nombreTipoPropiedad;
    }
    return propiedades;
}
export function buscarIdEnArreglo(arreglo, valor){
    let retornable = -1
    for(let i=0; i<arreglo.length; i++){
        if(arreglo[i].nombre == valor)
            {
                retornable= arreglo[i].id;
            }
    }
    return retornable;
}
export function buscarIdEnArregloPropiedades(arreglo, valor){
    let retornable = -1
    for(let i=0; i<arreglo.length; i++){
        if(arreglo[i].domicilio == valor)
            {
                retornable= arreglo[i].id;
            }
    }
    return retornable;
}

export function buscarIdEnArregloInquilino(arreglo, valor){
    let retornable = -1
    for(let i=0; i<arreglo.length; i++){
        if(arreglo[i].nombre +" "+ arreglo[i].apellido == valor)
            {
                retornable= arreglo[i].id;
            }
    }
    return retornable;
}
export function armarArreglosReservas (reservas,inquilinos,propiedades){ 
    let reserva = null;
    for(let i=0; i<reservas.length; i++){
        reserva = reservas[i];
        for(let j=0;j<inquilinos.length;j++){
           if(reserva.inquilino_id == inquilinos[j].id){
                reserva.inquilino_id = inquilinos[j].nombre+" "+inquilinos[j].apellido;
                break;
            } 
        }
        for(let k=0; k<propiedades.length; k++){
            if(reserva.propiedad_id == propiedades[k].id){
                reserva.propiedad_id = propiedades[k].domicilio;
                break;
            }
        }
        reserva[i]=reserva;
    }
    return reservas;
}