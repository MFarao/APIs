import React, { useState, useEffect } from "react";
import "../../estilos/FiltroProducto.css";
import logo from "../../assets/logo.png";

const FiltroProducto = ({onFiltro}) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  useEffect(() => {
    fetch("http://localhost:4002/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategorias(["Todas", ...data.map((cat) => cat.description)]); // hacemos el fetch de las categorias del Back para rendizaxrlos
      })
      .catch((err) => {
        console.error("Error al cargar categorías:", err.message);
        setCategorias(["Todas"]);
      });
  }, []);

  const filtroApasar = () => { // cargamos los filtros

    return onFiltro({
    categoria: categoriaSeleccionada,
    precioMin: precioMin ? Number(precioMin) : null,
    precioMax: precioMax ? Number(precioMax) : null,
    });
    
  };
  
  return (
    <div className="filtro-producto">
      <div className="panel-body">
        <h3 className= "text">Categorías</h3>
        <div className="categoria-lista">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`categoria-btn ${categoriaSeleccionada === cat ? "activa" : ""}`} // renderizamos los botones de las categorias
              onClick={() => setCategoriaSeleccionada(cat)}
            >
            {cat}
            </button>
          ))}
        </div>

        <h3 className= "text">Rango de precio</h3>
        <div className="precio-inputs">
          <input
            type="number"
            placeholder="Mínimo"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Máximo"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            min="0"
          />
        </div>
        <button className="aplicar-btn" onClick={() =>filtroApasar()} disabled={precioMin && precioMax && Number(precioMin) > Number(precioMax)} // aca pasamos como parametro los filtros seleccionados
        >
          Aplicar filtros
        </button>
        <div className="filtro-footer">
        <img src={logo} alt="GeekHaven Logo" className="filtro-logo" />
        <h2 className="filtro-title">GeekHaven</h2>
      </div>
      </div>
      
    </div>
  );
};

export default FiltroProducto;

