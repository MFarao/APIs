import "./estilos/App.css";
import Navbar from "./components/NavBar.jsx";
import PanelDeControl from "./components/PanelDeControl.jsx";
import Inicio from "./views/vistasUsuario/Inicio.jsx";
import Registro from "./views/vistasUsuario/Registro.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./views/vistasUsuario/Home.jsx";
import Productos from "./views/vistasUsuario/Productos.jsx";
import Ordenes from "./views/vistasUsuario/Ordenes.jsx";
import Sale from "./views/vistasUsuario/Sale.jsx";
import DetalleProducto from "./views/vistasUsuario/DetalleProducto.jsx";

import { useState } from "react";

function App() {
  const [busqueda, setBusqueda] = useState(null); // Estado para almacenar los resultados de búsqueda
  const capturarBusqueda = (resultado) => {
        setBusqueda(resultado); // Actualiza el estado con los nuevos resultados de búsqueda
    }
  return (
    <>
      <Navbar capturarBusqueda={capturarBusqueda}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos"  className="productos-container"element={<Productos busqueda={busqueda} />} //pasamos lo buscado a productos para que lo redirija
        />
        <Route path="/panelControl/*" element={<PanelDeControl />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sale" element={<Sale busqueda={busqueda} />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/misordenes" element={<Ordenes />} />
      </Routes>
    </>
  );
}

export default App;
