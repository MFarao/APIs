import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../estilos/Navbar.css";
import flechaIzq from "../assets/flechaIzq.png";
import logo from "../assets/logo.png";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <div className="navbar-left">
            <img src={flechaIzq} alt = "volver" className = "back-arrow" onClick={() => navigate(-1)} /> a chequear
            <img src={logo} alt="GeekHaven Logo" className="navbar-logo" />
            <span className="navbar-title">GeekHaven</span>
        </div> 
        <Link // con las backticks vemos si sobresaltar o no el texto dependiendo de donde esta parado
        to="/home" className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}>Home</Link> 
        <Link to="/productos" className={`nav-link ${location.pathname === "/productos" ? "active" : ""}`}>Productos</Link>
        <Link to="/misordenes" className={`nav-link ${location.pathname === "/misordenes" ? "active" : ""}`}>Mis Órdenes</Link>
        <Link to="/sale" className={`nav-link ${location.pathname === "/sale" ? "active" : ""}`}>Sale</Link>

      </div>
    </nav>
  );
};

export default Navbar;
