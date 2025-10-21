import React from "react";
import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../estilos/Checkout.css";
import { Link } from "react-router-dom";
import mercadoPagoLogo from "../../assets/mercadoPago.png";
import Swal from 'sweetalert2';

const Checkout = () => {
  const [p, setProducto] = useState(null);
  const { id } = useParams();
  const Url = `http://localhost:4002/products/${id}`;
    const [cantidad, setCantidad] = useState(1);
  const [envio, setEnvio] = useState("");
  const [conectado, setConectado] = useState(false);
    const navigate = useNavigate();
  
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

   const handleChange = (e) => {
    setEnvio(e.target.value)};

  const handleDecrease = () => {
    if (cantidad>1) { // no puede ser menor que 1
      const nuevaCant = cantidad - 1;
      setCantidad(nuevaCant);
    }
  };

  const handleIncrease = () => {
    if (cantidad< p.stock) { // no podes pedir mas del stock
      const nuevaCant = cantidad + 1;
      setCantidad(nuevaCant);
    }
  };

  const createOrder = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))// obtenemos el usuario

        const response = await fetch("http://localhost:4002/order", { // hacemos un POST con los datos de la orden 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
            body: JSON.stringify({ // cargamos la request
                idUser : user.id,
                idProducto : p.id,
                cantidadProducto: cantidad,
                envio_a : envio,
            }),
            
        });

        if (!response.ok) throw new Error("Error al crear la orden");
        Swal.fire({
            title: 'Orden creada ✅',
            text: 'Tu pedido fue procesado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ver mis órdenes',
        }).then((result) => {
            if (result.isConfirmed) {
            navigate('/misordenes');
            }
        });
        
    }catch(error)
        {Swal.fire({
        title: 'Error',
        text: 'No se pudo crear la orden.',
        icon: 'error',
      });}
    }

  if (!p) return <h3 className="cargando">Cargando producto...</h3>;

  const enSesion= () =>{
    if(!localStorage.getItem("token")){ // esta logeado?
      return false
    }else{return true}
  }

   if (!p.active) return <h3 className="no-disponible">Este producto no está disponible.</h3>;
  return (
    
        <main className="checkout-page">
      <div className="checkout-card-horizontal">
        <img
          src={p.imageUrls?.[0] || "/placeholder.png"}
          alt={p.name}
          className="checkout-img"
        />

        <div className="checkout-info">
          <h2 className="checkout-name">{p.name}</h2>
            <div className="quantity-selector">
            <button className="qty-btn" onClick={handleDecrease}>−</button>
            <span className="qty-value">{cantidad}</span>
            <button className="qty-btn" onClick={handleIncrease}>+</button>
        </div>
          <div className="checkout-stock">
            {p.stock > 0 ? (
              <span className="en-stock">En stock ({p.stock})</span>
            ) : (
              <span className="sin-stock">Sin stock</span>
            )}
          </div>

          <div className="checkout-precio">
            {p.priceDescuento && p.discountEndDate ? (
              <>
                <span className="precio-descuento">
                  ${p.priceDescuento.toFixed(2)}
                </span>
                <span className="precio-original">${p.price.toFixed(2)}</span>
                <p className="fecha-descuento">
                  Válido hasta {new Date(p.discountEndDate).toLocaleDateString()}
                </p>
              </>
            ) : (
              <span className="precio-normal">${p.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="checkout-summary">
            <div className="checkout-subtotal">
                <p>Rellene sus datos:</p>
                <form className= "forms">
                    <input type="text" placeholder="Ingrese su direccion " onChange={handleChange}/>

                    <button type="button" className={`btn-mercadopago ${conectado ? "active" : ""}`} onClick={() => setConectado(true)}
                    > <img className= "mpLogo" src={mercadoPagoLogo}/>
                    Conectar con MercadoPago</button>

                </form>
            </div>
        </div>
        <div className="checkout-summary">
            <div className="checkout-subtotal">
                <p>Subtotal:</p>
                {p.priceDescuento && p.discountEndDate ? // tiene descuento?
                <p className= "precio-descuento">${p.priceDescuento.toFixed(2) * cantidad}</p>  //agregamos el descuento y calculamos precio
                : (<p className= "precio-descuento">${p.price.toFixed(2) * cantidad}</p>)}
            </div>
            <div className= "footer">
                <p className="checkout-note">Impuestos (IVA 21%) y envio incluido.</p>
                <div className="checkout-action">
                {enSesion() ? (
              <button 
                    className="btn-comprar" onClick={createOrder} disabled={!conectado || envio.trim() === ""}>Proceder al pago</button> // lo deshabilitamos si no se conecto a MP y no escribio nada
            ) : (
              <Link to="/inicio" className="btn-login">
                Iniciar sesión para comprar
              </Link>
            )}
            </div></div>
            
        </div>
    </main>
  );
};

export default Checkout;
