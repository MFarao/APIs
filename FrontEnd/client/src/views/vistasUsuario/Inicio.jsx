import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../../estilos/Auth.css";
import Swal from "sweetalert2";

const Inicio = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Autenticación
      const res = await fetch("http://localhost:4002/api/v1/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }); // recibimos el token

      if (!res.ok) throw new Error("Correo o contraseña incorrectos");

      const data = await res.json();
      const token = data.access_token || data.token || data.tokenJwt || data.tokenJwt; // soporta variantes
      if (!token) throw new Error("No se recibió token del servidor");

      localStorage.setItem("token", token);

      // agarramos el perfil del usuario con el token
      const perfilRes = await fetch("http://localhost:4002/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!perfilRes.ok) throw new Error("No se pudo obtener el perfil del usuario");


      const user = await perfilRes.json();
      console.log(user.role)
      if(user.role === "BLOQUEADO"){ // si el usuario tiene rol bloqueado no inicia sesion

        Swal.fire({
          title: "Acceso denegado",
          text: "Tu cuenta está bloqueada. Contactá al administrador.",
          icon: "error",
          confirmButtonText: "Entendido",
        });
        return;

      }else{ // si el usuario no esta bloqueado lo manda a la ultima ruta en la q estuvo

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
      
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
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