import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../estilos/Auth.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1) Crear el usuario
      const res = await fetch("http://localhost:4002/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.nombre,
          lastname: formData.apellido,
          email: formData.email,
          password: formData.password,
          role: "USER",
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || "No se pudo registrar el usuario");
      }

      // 2) Auto-login (usar mismo endpoint que en Inicio)
      const loginRes = await fetch("http://localhost:4002/api/v1/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (!loginRes.ok) throw new Error("Error al iniciar sesión automáticamente");

      const loginData = await loginRes.json();
      const token = loginData.access_token || loginData.token;
      if (!token) throw new Error("No se recibió token tras el registro");

      localStorage.setItem("token", token);

      // 3) Obtener perfil
      const perfilRes = await fetch("http://localhost:4002/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!perfilRes.ok) throw new Error("No se pudo obtener el perfil del usuario");

      const user = await perfilRes.json();
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir a productos
      navigate("/productos");
    } catch (err) {
      setError(err.message || "Error en el registro");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />

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

        <button type="submit">Crear cuenta</button>

        {error && <p className="error">{error}</p>}
      </form>

      <div>
        <Link to="/inicio">¿Ya tenes una cuenta?</Link>
      </div>
      <div>
        <Link to="/">Volver a la pagina de inicio</Link>
      </div>
    </div>
  );
};

export default Registro;