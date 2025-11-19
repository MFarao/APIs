import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../../estilos/Auth.css";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from 'react-redux'
import { authenticateUser } from "../../redux/userSlice";

const Inicio = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {error} = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Autenticación
    const resultAction = await dispatch(authenticateUser(formData)); // recibimos el token
    const { user } = resultAction.payload;
    if(user.role === "BLOQUEADO"){ // si el usuario tiene rol bloqueado no inicia sesion
      Swal.fire({
        title: "Acceso denegado",
        text: "Tu cuenta está bloqueada. Contactá al administrador.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;}

    else{ // si el usuario no esta bloqueado lo manda a la ultima ruta en la q estuvo

      localStorage.setItem("user", JSON.stringify(user)); // lo guardamos en el local
      const ultimaRuta = localStorage.getItem("ultimaRuta");

      if(!ultimaRuta){ // chequeamos si vino del boton de detallePedido (el cual captura la ultimaruta en el LocalStorage)
      // si vino de /registro lo mandamos a /productos, si vino de otra ruta, regresar ahí, si no /productos
        const destino =
        location.state?.from === "/registro"
          ? "/productos"
          : location.state?.from || "/productos";
          navigate(destino);
      }else{
        const destino = ultimaRuta
        navigate(destino);
        localStorage.removeItem("ultimaRuta"); //limpiamos el LocalStorage para evitar redirecciones indeseadas
      }
    }
  };

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