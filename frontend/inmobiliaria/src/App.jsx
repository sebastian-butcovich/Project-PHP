
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AgregarTipoPropiedad from './pages/tipoPropiedad/AgregarTipoPropiedad';
import TipoPropiedadPage from './pages/tipoPropiedad/TipoPropiedadPage'
import PropiedadPage from './pages/propiedad/PropiedadPage';
import Reservas from './pages/reservas/Reservas';
import DetailPropiedad from './pages/propiedad/DetailPropiedad';
import NewPropiedad from './pages/propiedad/NewPropiedad';
import EditPropiedad from './pages/propiedad/EditPropiedad';
import EditTipoPropiedad from './pages/tipoPropiedad/EditTipoPropiedad';
import NewReserva from './pages/reservas/NewReserva';
import EditReserva from './pages/reservas/EditReserva'
const router = createBrowserRouter(
  [
  {
    path:"/",
    element:<PropiedadPage/>
  },
  {
    path:"tipoPropiedad",
    element:<TipoPropiedadPage/>
  },
  {
    path:"reservas",
    element:<Reservas/>
  },
  {
    path:"detailPropiedades",
    element:<DetailPropiedad/>
  },
  {
    path:"newPropiedad",
    element:<NewPropiedad/>
  },
  {
    path:"editarPropiedad",
    element:<EditPropiedad/>
  },
  {
    path:"editarTipoPropiedad",
    element:<EditTipoPropiedad/>
  },
  {
    path:"newTipoPropiedad",
    element:<AgregarTipoPropiedad/>
  },
  {
    path:"newReserva",
    element:<NewReserva/>
  },
  {
    path:"editReserva",
    element:<EditReserva/>
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
