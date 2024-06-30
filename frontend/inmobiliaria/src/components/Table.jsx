import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../css/css_components/Table.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Swal from "sweetalert2";

function Table({
  data,
  columns,
  condicion,
  funcionEliminar,
  paginaEditar,
  obtenerData,
}) {
  const navi = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th>Acciones</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="column-buttons">
                {condicion ? (
                  <button
                    className="btn-row-table"
                    onClick={() => {
                      navi("/detailPropiedades", {
                        state: {
                          data: row.original,
                        },
                      });
                    }}
                  >
                    Ver detalle
                  </button>
                ) : (
                  <></>
                )}
                <button
                  className="btn-row-table"
                  onClick={() => {
                    navi(`${paginaEditar}`, {
                      state: {
                        data: row.original,
                      },
                    });
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn-row-table"
                  onClick={() => {
                    Swal.fire({
                      title: "Eliminar entrada",
                      text: "Esta seguro de que desa borrar este dato?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "blue",
                      cancelButtonColor: "red",
                      confirmButtonText: "Si eliminar",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        let response = await funcionEliminar(row.original.id);
                        if (response == 200) {
                          Swal.fire({
                            title: "Entrada eliminada",
                          }).then((confirm) => {
                            if (confirm.isConfirmed) {
                              obtenerData();
                            }
                          });
                        } else {
                          if (response == 404) {
                            Swal.fire({
                              title: "Ocurrio un error",
                              icon: "error",
                              text:
                                "No existe una propiedad con ese ID, el registro que quiere eliminar " +
                                "ya no esta cargado en los datos actualize la pestaña del navegador",
                            });
                          } else {
                            Swal.fire({
                              title: "Ocurrio un error",
                              icon: "error",
                              text: "Hay una reserva asociada a esta propiedad no se puede borrar hasta que se cancele la reserva o se lleva a cabo la misma",
                            });
                          }
                        }
                      }
                    });
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-btn-navigate-table">
        <button
          className="btn-navigate-table"
          onClick={() => table.setPageIndex(0)}
        >
          Primera pagina
        </button>
        <button
          className="btn-navigate-table"
          onClick={() => table.previousPage()}
        >
          Pagina anterior
        </button>
        <button className="btn-navigate-table" onClick={() => table.nextPage()}>
          Pagina siguiente
        </button>
        <button
          className="btn-navigate-table"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Ultima pagina
        </button>
      </div>
    </div>
  );
}

export default Table;
