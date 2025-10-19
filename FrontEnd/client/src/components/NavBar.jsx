import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../estilos/Navbar.css";
import flechaIzq from "../assets/flechaIzq.png";
import logo from "../assets/logo.png";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mostrarFlechaIzq = location.pathname !== "/";

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <div className="navbar-left">
            {mostrarFlechaIzq && (<img src={flechaIzq} alt = "volver" className = "back-icon" onClick={() => navigate(-1)} />)}
            <img src={logo} alt="GeekHaven Logo" className="navbar-logo" />
            <span className="navbar-title">GeekHaven</span>
        </div> 
        <Link // con las backticks vemos si sobresaltar o no el texto dependiendo de donde esta parado
        to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link> 
        <Link to="/productos" className={`nav-link ${location.pathname === "/productos" ? "active" : ""}`}>Productos</Link>
        <Link to="/misordenes" className={`nav-link ${location.pathname === "/misordenes" ? "active" : ""}`}>Mis Órdenes</Link>
        <Link to="/sale" className={`nav-link ${location.pathname === "/sale" ? "active" : ""}`}>Sale</Link>
        <Link to="/panelControl" className={`nav-link ${location.pathname === "/panelControl" ? "active" : ""}`}>Panel de Control</Link>
      </div>

      <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Buscar..." className="search-input" />
      </form>


      <div className="navbar-auth">
      <Link to="/inicio" className={`auth-link ${location.pathname === "/inicio" ? "active" : ""}`}>Iniciar sesión</Link>
      <Link to="/registro" className={`auth-link registro ${location.pathname === "/registro" ? "active" : ""}`}>Registrarse</Link>
    </div>
    </nav>
  );
};

export default Navbar;
