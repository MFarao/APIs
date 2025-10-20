import React from "react";
import "../../estilos/Product.css";
import { Link } from "react-router-dom";

const ProductComponent = ({id, name,description, price, priceDescuento,discountEndDate, categoryId,categoryName, imageUrls,stock,active})=>{
      return (
        <div className={`product-card ${!active ? "inactive" : ""}`}>
          <div className="product-image">
            <img src={imageUrls?.[0]} alt={name} />
          </div>

          <div className="product-info">
            <h3 className="product-name">{name}</h3>
            <p className="product-category">Categoría: {categoryName || categoryId}</p>
            <div className="product-pricing">
              <p className="product-price">${price}</p>
              {priceDescuento && (
                <p className="product-discount">→ ${priceDescuento.toFixed(2)}</p>
              )}
              {priceDescuento && (
                <p className="product-discount">{(priceDescuento * 100 / price).toFixed(0)}% OFF!</p>
              )}
            </div>
            {discountEndDate && (
              <p className="product-discount-date">
                Descuento hasta: {new Date(discountEndDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <Link to={`/productos/${id}`} className="vermas-boton">VER MÁS</Link>
        </div>
    )
}

export default ProductComponent