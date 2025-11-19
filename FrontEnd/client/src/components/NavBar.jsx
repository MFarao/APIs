import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../estilos/Navbar.css";
import flechaIzq from "../assets/flechaIzq.png";
import logo from "../assets/logo.png";
import Swal from 'sweetalert2';
import { setBusqueda } from "../redux/productSlice";
import {useDispatch, useSelector} from 'react-redux'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()

  // Cargar usuario desde localStorage al montar y cuando cambie el token
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const confirmarLogout = () => { // preguntamos si quiere cerrar sesion
  Swal.fire({
    title: "¿Estás seguro/a?",
    text: "Vas a cerrar sesión y volver al inicio.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6b4eff",
    cancelButtonColor: "#aaa",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) { // si confirma hacemos el handle del logout 
      handleLogout();
    }
  });
};

  const mostrarFlechaIzq = location.pathname !== "/";
  const mostrarBusqueda =
    !location.pathname.startsWith("/panelControl/")  &&
    location.pathname !== "/misordenes" &&
    location.pathname !== "/configuracion" &&
    !location.pathname.startsWith("/productos/") &&
    location.pathname !== "/";
  const mostarNavBar = location.pathname !== "/inicio" && location.pathname !== "/registro";

  if (!mostarNavBar) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <div className="navbar-left">
          {mostrarFlechaIzq && (
            <img
              src={flechaIzq}
              alt="volver"
              className="back-icon"
              onClick={() => navigate(-1)}
            />
          )}
          <img src={logo} alt="GeekHaven Logo" className="navbar-logo" />
          <span className="navbar-title">GeekHaven</span>
        </div>

        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link
          to="/productos"
          className={`nav-link ${location.pathname === "/productos" ? "active" : ""}`}
        >
          Productos
        </Link>
        {user?.role === "USER" && (
          <Link
            to="/misordenes"
            className={`nav-link ${location.pathname === "/misordenes" ? "active" : ""}`}
          >
            Mis Órdenes
          </Link>
        )}
        <Link to="/sale" className={`nav-link ${location.pathname === "/sale" ? "active" : ""}`}>
          Sale
        </Link>
        {user?.role === "ADMIN" && (
          <Link
            to="/panelControl/productos"
            className={`nav-link ${location.pathname === "/panelControl" ? "active" : ""}`}
          >
            Panel de Control
          </Link>
        )}
      </div>

      {mostrarBusqueda && (
        <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Buscar..." className="search-input" onChange={(e) => dispatch(setBusqueda(e.target.value))}/> {/* on change mandamos lo del iinput al estado global para ser usado por product list o sale */}
        </form>
      )}

      <div className="navbar-auth">
        {user ? (
          <>
            {/* uso firstname porque en el backend usabas firstname/lastname */}
            <Link to="/configuracion" className="navbar-user">Hola, {user.firstname || user.nombre || user.name} !!</Link>
            <button onClick={confirmarLogout} className="logout-btn">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/inicio" className={`auth-link ${location.pathname === "/inicio" ? "active" : ""}`}>
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className={`auth-link registro ${location.pathname === "/registro" ? "active" : ""}`}
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
