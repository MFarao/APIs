import "./estilos/App.css";
import Navbar from "./components/NavBar";
import PanelDeControl from "./components/PanelDeControl";
import ProductList from "./components/product/ProductList.jsx";
import Inicio from "./views/vistasUsuario/Inicio";
import { Routes, Route } from "react-router-dom";
import Home from "./views/vistasUsuario/Home.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductList/>} />
        <Route path="/panelControl/*" element={<PanelDeControl />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </>
  );
}

export default App;
