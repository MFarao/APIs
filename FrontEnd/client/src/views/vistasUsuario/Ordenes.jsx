import React, { useEffect, useState } from "react";
import "../../estilos/Ordenes.css";


const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="ordenes-container">
      <h2 className="ordenes-h2">Mis Órdenes</h2>
      {error && <p className="error">{error}</p>}
      <table className="ordenes-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Enviado a</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.nombreProducto}</td>
              <td>{orden.cantidadProducto}</td>
              <td>${orden.total.toFixed(2)}</td>
              <td>{orden.envio_a}</td>
              <td>{new Date(orden.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ordenes;