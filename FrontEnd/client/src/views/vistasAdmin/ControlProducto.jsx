import React, { useEffect, useState } from "react";
import ProductForm from "../../components/controlAdmin/ProductForm";
import ProductRow from "../../components/controlAdmin/ProductRow";

const ControlProducto = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = () => {
    fetch("http://localhost:4002/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleIn_Activar = (id) => {
    fetch(`http://localhost:4002/products/${id}/in_activar`, {
      method: "PUT",
      headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(() => fetchProducts())
      .catch((err) => console.error("Error al eliminar productos:", err));
  };
  
  return (
    <div className="panel-layout-container">
      <div className="header">
        <h2>Control de Productos</h2>
        <button className="add-btn" onClick={() => {
          setSelectedProduct(null);
          setShowForm(true);
        }}>+ Agregar Producto</button>
      </div>

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowForm(false)}
          onRefresh={fetchProducts}
        />
      )}

      <table className="panel-layout-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Con descuento</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Imagenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((pro) => (
            <ProductRow
              key={pro.id}
              producto={pro}
              onEditar={() => handleEdit(pro)}
              onActualizado={() => handleIn_Activar(pro.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ControlProducto;
