import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../../estilos/DetalleProducto.css";

const DetalleProducto = () => {
  const [p, setProducto] = useState(null);
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const Url = `http://localhost:4002/products/${id}`;

  useEffect(() => { // hacemos el fetch del producto
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setProducto(data);
        setImagenPrincipal(data.imageUrls?.[0] || "");
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error.message);
      });
  }, []);

  if (!p) return <h3 className="cargando">Cargando producto...</h3>;

  const enSesion = () => { // chequeamos si el usuario esta iniciado o no consultando el local storage que se arma cuando se renderiza al iniciar sesion
    if (!localStorage.getItem("token")) {
      localStorage.setItem("ultimaRuta", location.pathname); // si no esta iniciado guardamos la ruta para redirigirlo
      return false;
    } else {
      return true;
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="detalle-container">
      <div className="galeria">
        <img src={imagenPrincipal} alt={p.name} className="imagen-principal" />
        <div className="miniaturas">
          {p.imageUrls?.slice(0, 3).map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Vista ${i + 1}`}
              className="miniatura"
              onMouseEnter={() => setImagenPrincipal(url)}
            />
          ))}
        </div>
      </div>

      <div className="info">
        <h1 className="titulo">{p.name}</h1>
        <p className="descripcion">{p.description}</p>

        <div className="precio-section">
          {p.priceDescuento ? (
            <>
              <span className="precio-original">${p.price}</span>
              <span className="precio-descuento">${p.priceDescuento.toFixed(2)}</span>
              <span className="etiqueta-descuento">
                {(100 - (p.priceDescuento * 100) / p.price).toFixed(0)}% OFF
              </span>
            </>
          ) : (
            <span className="precio">${p.price}</span>
          )}
        </div>

        {p.discountEndDate && (
          <p className="fecha-descuento">
            Descuento hasta: {new Date(p.discountEndDate).toLocaleDateString()}
          </p>
        )}

        {enSesion() ? ( // si esta en sesion vemos que es rol tiene para mostrarlo o no // si no esta iniciado se muestra el boton de inicia sesion y compra
          user?.role === "USER"? (
            <Link to={`/checkout/${id}`} className="boton-carrito">Comprar</Link>
          ) : (
            null
          )
        ) : <Link to={"/inicio"} className="boton-carrito">Iniciá sesión y compra!</Link>} 

        <div className="detalles-tecnicos">
          <h2>Detalle del Producto</h2>
          <ul>
            <li><strong>Categoria:</strong> {p.categoryName || "Sin Categoria"}</li>
            <li><strong>Estado:</strong> {p.active ? "Nuevo" : "Inactivo"}</li>
            <li><strong>Stock:</strong> {p.stock > 0 ? `${p.stock} disponibles` : "Sin stock"}</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DetalleProducto;

