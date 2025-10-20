import React, { useState } from "react";
import FiltroProducto from "../../components/product/FiltroProducto";
import ProductList from "../../components/product/ProductList";

const Productos = ({busqueda}) => {
    const [filtro, setFiltro] = useState(null); // Estado para almacenar los filtros aplicados
    const obtenerFiltro = (nuevosFiltros) => {
        setFiltro(nuevosFiltros); // Actualiza el estado con los nuevos filtros
    }
    return(
        // mandamos a obtener los filtros mediante props (como ese prop actualiza el estado del padre lo obtenemos correctamente)
        <div className="productos-page">
            <div className="filtro-container"><FiltroProducto onFiltro={obtenerFiltro} /> </div>
            <div className="productos-container"><ProductList filtrosAplicar={filtro} busqueda={busqueda} sale={false} /></div>
            
        </div>
        // luego de que el filtro los obtiene y actualiza su estado se lo manda los productos
    );
}
export default Productos;