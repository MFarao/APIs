import React from "react";
import { Link, useLocation, useNavegate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navegate = useNavegate();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <div className="navbar-left">
            <img src="../assets/flechaIzq.png" alt = "volver" className = "back-arrow" onClick={() => navegate(-1)} /> a chequear
            <img src="../assets/logo.png" alt="GeekHaven Logo" className="navbar-logo" />
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
