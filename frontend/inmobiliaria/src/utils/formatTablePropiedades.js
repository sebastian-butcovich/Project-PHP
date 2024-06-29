export function getFormat(){

    const  format = [
        
        {
            header:"Domicilio",
            accessorKey:"domicilio"                                                           
        },
        {
            header:"Localidad",
            accessorKey:"localidad_id"
        },
        {
            header:"Cantidad de Huespedes",
            accessorKey:"cantidad_huespedes"
        },
        
        {
            header:"Fecha de disponibilidad",
            accessorKey:"fecha_inicio_disponibilidad"
        },
        
        {
            header:"Valor de una noche",
            accessorKey:"valor_noche"
        },
       
        {
            header:"Tipo de propiedad",
            accessorKey:"tipo_propiedad_id"
        },
        
        
    ]
    return format;
}
export const getFormatTableTipoPropiedad = [
    {
        header:"Tipo de propiedad",
        accessorKey:"nombre"
    }
]
export const getColumnsReservas = [ 
    {
        header:"Propiedad",
        accessorKey:"propiedad_id",
    },
    {
        header:"Inquilino",
        accessorKey:"inquilino_id"
    },
    {
        header:"Fecha de reserva",
        accessorKey:"fecha_desde"
    },
    {
        header:"Cantidad de noches",
        accessorKey:"cantidad_noches"
    },
    {
        header:"Valor total",
        accessorKey:"valor_total"
    }
]
