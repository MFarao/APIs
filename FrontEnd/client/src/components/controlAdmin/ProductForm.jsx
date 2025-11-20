import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ProductForm = ({ product, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 1,
    categoryId: "",
    imageUrls: "",
    stock: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "number") {
      if (value > 0) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmacion = await Swal.fire({
      title: "¿Publicar este producto?",
      text: "Estás por guardar y publicar este producto en la tienda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6c2bd9",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, publicar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    const method = product ? "PUT" : "POST";
    const url = product
      ? `http://localhost:4002/products/${product.id}`
      : "http://localhost:4002/products";

    const body = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      categoryId: formData.categoryId === "" ? null : formData.categoryId,
      stock: formData.stock,
    };

    try {
      if (formData.imageUrls) {
        if (typeof formData.imageUrls === "string") {
          body.imageUrls = formData.imageUrls
            .split(",")
            .map((url) => url.trim())
            .filter((url) => url !== "");
        } else if (Array.isArray(formData.imageUrls)) {
          body.imageUrls = formData.imageUrls.filter((url) => typeof url === "string");
        }
      }
    } catch (err) {
      console.error("Error al procesar las imágenes:", err);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Error al guardar producto");

      Swal.fire({
        title: "Producto cargado ✅",
        text: "El producto fue guardado correctamente.",
        icon: "success",
      });

      onRefresh();
      onClose();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar el producto.",
        icon: "error",
      });
      console.error("Error al guardar producto:", err);
    }
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        categoryId: product.categoryId || "",
        imageUrls: Array.isArray(product.imageUrls)
          ? product.imageUrls.join(", ")
          : product.imageUrls || "",
        stock: product.stock || 0,
        active: product.active ?? true,
      });
    }
  }, [product]);

  const camposObligatorios = [
    formData.name,
    formData.description,
    formData.price,
    formData.stock,
  ];

  return (
    <div className="form-overlay">
      <form className="panel-layout-form" onSubmit={handleSubmit}>
        <h3>{product ? "Editar Producto" : "Agregar Producto"}</h3>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Precio</label>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="categoryId"
          placeholder="ID Categoría (opcional)"
          value={formData.categoryId}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrls"
          placeholder="URLs de imagen separadas por coma"
          value={formData.imageUrls}
          onChange={handleChange}
        />

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit" disabled={camposObligatorios.some((campo) => !campo)}>
            Guardar
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
