import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../estilos/Auth.css";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from 'react-redux';
import { authenticateUser } from "../../redux/userSlice";

const Inicio = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {userEnSesion, error} = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(authenticateUser(formData)); // despachamos el login con la data
};

useEffect(() => { // cuando detecta algun cambio en el userensesion se ejecuta
  if (userEnSesion) { // como es secuencial debemos asegurarnos que primero se despache para seguir
    if (userEnSesion.role === "BLOQUEADO") {
      Swal.fire({
        title: "Acceso denegado",
        text: "Tu cuenta está bloqueada. Contactá al administrador.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    const ultimaRuta = localStorage.getItem("ultimaRuta");
    const destino =
      ultimaRuta || 
      (location.state?.from === "/registro" ? "/productos" : location.state?.from || "/productos");

    navigate(destino);
    localStorage.removeItem("ultimaRuta");
  }
}, [userEnSesion, navigate, location]);

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Ingresar</button>

        {error && <p className="error">{error}</p>}
      </form>

      <div>
        <Link to="/registro">¿Aún no tenes una cuenta?</Link>
      </div>
      <div>
        <Link to="/">Volver a la pagina de inicio</Link>
      </div>
    </div>
  );
};

export default Inicio;