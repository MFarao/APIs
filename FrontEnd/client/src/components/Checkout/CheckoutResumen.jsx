import React from "react";
import { Link } from "react-router-dom";

const CheckoutResumen = ({ p, cantidad, conectado, envio, createOrder }) => (
  <div className="checkout-summary">
    <div className="checkout-subtotal">
      <p>Subtotal:</p>
      {p.priceDescuento && p.discountEndDate ? ( // dependiendo si tiene o no descuento mostramos el resultado final de la compra
        <p className="precio-descuento">${p.priceDescuento.toFixed(2) * cantidad}</p>
      ) : (
        <p className="precio-descuento">${p.price.toFixed(2) * cantidad}</p>
      )}
    </div>
    <div className="footer">
      <p className="checkout-note">Impuestos (IVA 21%) y envio incluido.</p>
      <div className="checkout-action">
        {localStorage.getItem("token") ? ( // si no le dio a conectar a mercado pago o  el envio esta vacio, deshabilita el boton
          <button className="btn-comprar" onClick={createOrder} disabled={!conectado || envio.trim() === ""}>
            Proceder al pago
          </button>
        ) : ( // si no esta iniciado y llega a esa url le pide que inice sesion
          <Link to="/inicio" className="btn-login">Iniciar sesión para comprar</Link>
        )}
      </div>
    </div>
  </div>
);

export default CheckoutResumen;
