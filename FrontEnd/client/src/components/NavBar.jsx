import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../estilos/Navbar.css";
import flechaIzq from "../assets/flechaIzq.png";
import logo from "../assets/logo.png";

const Navbar = ({capturarBusqueda}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
  }, [localStorage.getItem("token")]); // eslint-disable-line

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const mostrarFlechaIzq = location.pathname !== "/";
  const mostrarBusqueda =
    location.pathname !== "/panelControl" &&
    location.pathname !== "/misordenes" &&
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
            to="/panelControl"
            className={`nav-link ${location.pathname === "/panelControl" ? "active" : ""}`}
          >
            Panel de Control
          </Link>
        )}
      </div>

      {mostrarBusqueda && (
        <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Buscar..." className="search-input" onChange={(e) => capturarBusqueda(e.target.value)}/>
        </form>
      )}

      <div className="navbar-auth">
        {user ? (
          <>
            {/* uso firstname porque en el backend usabas firstname/lastname */}
            <span className="navbar-user">Hola, {user.firstname || user.nombre || user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
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
