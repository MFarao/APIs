import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ProductForm = ({ product, onClose, onRefresh }) => { // puede ser q venga un producto para su modificacion o no para la creacion
  const [formData, setFormData] = useState({ // usamos el estado para guardar los datos
    name: "",
    description: "",
    price: 1,
    categoryId: "",
    imageUrls: "",
    stock: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if(type === "number"){
      if(value> 0){
          setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      }else{
        return
      }
    }else{
      setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    }
  
  };

  const handleSubmit = async (e) => {e.preventDefault();
    
    const confirmacion = await Swal.fire({ // damos alerta ue si desea cargar o no el producto
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

    const method = product ? "PUT" : "POST"; // vemos a q endpoint mapear dependiendo si es put o post
    const url = product
      ? `http://localhost:4002/products/${product.id}`
      : "http://localhost:4002/products";
    
    const body = { //cargamos los datos base
      name: formData.name,
      description: formData.description,
      price: formData.price,
      categoryId: formData.categoryId,
      stock: formData.stock,
    };
    console.log(formData.imageUrls)
    try{
      if (formData.imageUrls) { // si hay imagenes con el formato correcto (img1,img2,img3) lo convertimos a array para que el back pueda cargar biien
      body.imageUrls = formData.imageUrls
        .split(",")                 // separa por comas las imagenes
        .map((url) => url.trim())   // limpia espacios
        .filter((url) => url !== ""); // sacamos los vacios
    }
    }catch(err){console.error("Error al guardar producto:", err)}
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body)
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
    if (product) { // si hay producto llenamos los datos del state usandolo como dependencia
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        categoryId: product.categoryId || "",
        imageUrls: product.imageUrls || "",
        stock: product.stock || 0,
        active: product.active ?? true,
      });
    }
  }, [product]);

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
          placeholder="ID Categoría"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrls"
          placeholder="URL de imagen: formato [img1,..,img3] max(3)"
          value={formData.imageUrls}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit"disabled= {!formData.categoryId && !formData.description && !formData.name && !formData.imageUrls && !formData.price && !formData.stock}>Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
