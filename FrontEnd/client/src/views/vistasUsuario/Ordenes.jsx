import React, { useEffect, useState } from "react";
import "../../estilos/Ordenes.css";


const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS"); // estado para el filtro de entregsdos

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        const res = await fetch(`http://localhost:4002/order/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) throw new Error("No se pudieron cargar las órdenes");

        const data = await res.json();

        setOrdenes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrdenes();
  }, [token]);

  const ordenesFiltradas = ordenes.filter((orden) => // filtramos las ordenes por estado, todas o las que tienen cierto estado asociado
    filtroEstado === "TODOS" ? true : orden.status === filtroEstado
  );

  return (
     <div className="ordenes-container">
      <h2 className="ordenes-h2">Mis Órdenes</h2>

      <div className="ordenes-tabs">
        {["Todos", "Pago", "Preparando", "Enviado" , "Entregado"].map((estado) => (
          <button
            key={estado.toUpperCase()}
            className={`ordenes-tab ${filtroEstado === estado.toUpperCase() ? "active" : ""}`}
            onClick={() => setFiltroEstado(estado.toUpperCase())} // estandarizamos los estados para que los filtros funcionen
          >
            {estado}
          </button>
        ))}
      </div>

      <div className="ordenes-lista">
        {ordenesFiltradas.map((orden) => (
          <div key={orden.id} className="orden-card">
            <div className="orden-card-header">
              <span className="orden-id">Orden #{orden.id}</span>
              <span className={`orden-status ${orden.status.toLowerCase()}`}>
                {orden.status}
              </span>
            </div>

            <div className="orden-card-body">
              <div className="orden-columna izquierda">
                <p><strong>{orden.nombreProducto}</strong></p>
                <p>Cantidad: {orden.cantidadProducto}</p>
                <p>Total: ${orden.total.toFixed(2)}</p>
              </div>

              <div className="orden-columna derecha">
                <p>Dirección: {orden.envio_a}</p>
                <p>Fecha: {new Date(orden.fecha).toLocaleDateString()}</p>
              </div>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ordenes;