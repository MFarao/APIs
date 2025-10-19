import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../estilos/Auth.css";


const API_URL = "http://localhost:4002/api/v1";
 
const Inicio = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password }),
      });

      if (!res.ok) throw new Error("Usuario o contraseña incorrectos");
      const data = await res.json();

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", usuario);

      // Redirigir a la página anterior o al catálogo
      const from = location.state?.from || "/productos";
      navigate(from);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="login">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesion</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
};
export default Inicio;