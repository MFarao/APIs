import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const DiscountForm = ({ discount, onClose, onRefresh }) => {
  const[formData, setFormData] = useState({
    percentage: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: discount ? "¿Actualizar descuento?" : "¿Crear descuento?",
      text: "Esta acción afectará los productos asociados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6c2bd9",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, publicar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    const method = discount ? "PUT" : "POST";
    const url = discount
      ? `http://localhost:4002/discounts/${discount.id}`
      : "http://localhost:4002/discounts";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al guardar descuento");

      Swal.fire({
        title: "Descuento guardado ✅",
        icon: "success",
      });

      onRefresh();
      onClose();
    } catch (err) {
      console.error("Error al guardar descuento:", err);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el descuento.",
        icon: "error",
      });
    }
  };

  return (
    <div className="form-overlay">
      <form className="panel-layout-form" onSubmit={handleSubmit}>
        <h3>{discount ? "Editar Descuento" : "Crear Descuento"}</h3>

        <label>Porcentaje (%)</label>
        <input
          type="number"
          name="percentage"
          value={formData.percentage}
          onChange={handleChange}
          required
          min="1"
          max="100"
        />

        <label>Fecha de Inicio</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label>Fecha de Fin</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};


export default DiscountForm;