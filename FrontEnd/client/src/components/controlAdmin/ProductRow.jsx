import React from "react";

const ProductRow = ({ producto, onEditar, onActualizado }) => {
  const toggleActivo = async () => {
    try {
      await fetch(`http://localhost:4002/products/${producto.id}/in_activar`, {
        method: "PUT",
      });
      onActualizado();
    } catch (err) {
      console.error("Error al activar/inactivar", err);
    }
  };

  return (
    <tr>
      <td>{producto.id}</td>
      <td>{producto.name}</td>
      <td>{producto.description}</td>
      <td>${producto.price.toFixed(2)}</td>
      <td>{producto.priceDescuento ? `$${producto.priceDescuento}` : "-"}</td>
      <td>{producto.stock}</td>
      <td>
        <span className={producto.active ? "activo" : "inactivo"}>
          {producto.active ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td>
        {producto.imageUrls?.[0] ? (
          <img
            src={producto.imageUrls[0]}
            alt={producto.name}
            className="img-miniatura"
          />
        ) : (
          "-"
        )}
      </td>
      <td>
        <button className="button edit" onClick={() => onEditar(producto)}>Editar</button>
        <button className="button delete" onClick={toggleActivo}>
          {producto.active ? "🚫" : "✅"}
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;