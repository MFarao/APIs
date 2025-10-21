import React from "react";
import { useEffect, useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../estilos/DetalleProducto.css";
import { Link } from "react-router-dom";

const DetalleProducto = () => {
  const [p, setProducto] = useState(null);
  const { id } = useParams();
  const Url = `http://localhost:4002/products/${id}`;
  const location = useLocation();
  
    useEffect(() => {
    fetch(Url) // mapeamos el endpoint del producto
      .then((response) => response.json())
      .then((data) => {
        setProducto(data)
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error.message);
      });
  }, []);

  if (!p) return <h3 className="cargando">Cargando producto...</h3>;

  const enSesion= () =>{
    if(!localStorage.getItem("token")){ // esta logeado?
      localStorage.setItem("ultimaRuta", location.pathname) // guardamos la ruta si no esta logeado
      return false
    }else{return true}
  }

  const user = JSON.parse(localStorage.getItem("user"))// obtenemos el usuario en sesion

  return (
<main className="detalle-container">
      <div className="galeria">
        <img src={p.imageUrls?.[0]} alt={p.name} className="imagen-principal" />
        <div className="miniaturas">
          {p.imageUrls?.slice(1, 3).map((url, i) => (
            <img key={i} src={url} alt={`Vista ${i + 2}`} className="miniatura" />
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
        {user?.role === "USER" ? // es un usuario y no un admin? si es un admin no mostramos el boton de compra o inicio
         (enSesion() ? // esta en sesion?
        <Link to={`/checkout/${id}`} className="boton-carrito">Comprar</Link>  //tiene la posibilidad de comprar 
        : <Link to={"/inicio"} className="boton-carrito">Iniciá sesión y compra!</Link> ): ""}

        <div className="detalles-tecnicos">
          <h2>Detalle del Producto</h2>
          <ul>
            <li><strong>Categoria:</strong> {p.categoryName ? p.categoryName : "Sin Categoria"}</li>
            <li><strong>Estado:</strong> {p.active ? "Nuevo" : "Inactivo"}</li>

            <li><strong>Stock:</strong> {p.stock > 0 ? `${p.stock} disponibles` : "Sin stock"}</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DetalleProducto;
