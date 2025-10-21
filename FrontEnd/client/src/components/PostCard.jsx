

import React from 'react';
import { Link } from 'react-router-dom';


const PostCard = ({ product }) => {
  const detailUrl = `/productos/${product.id}`;

  return (
    <Link to={detailUrl} style={{ textDecoration: 'none' }}>
      <div className={`product-card ${!product.stock ? 'inactive' : ''}`}>
        
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.title}</h3>
          
          <div className="product-pricing">
            <p className="product-price">${product.price.toLocaleString('es-AR')}</p>
          </div>

          <p className="product-stock">Stock: {product.stock || 0}</p>
        </div>

      </div>
    </Link>
  );
};

export default PostCard;