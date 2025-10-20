import { useEffect, useState } from "react";
import ProductComponent from "./ProductComponent";
import "../../estilos/Product.css";

const ProductList = ({filtrosAplicar, busqueda, sale}) => {
  
  const [products, setProduct] = useState([]);
  const Url = "http://localhost:4002/products";

  useEffect(() => {
    fetch(Url) // mapeamos el endpoint de los productos
      .then((response) => response.json())
      .then((data) => {
        setProduct(data)
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error.message);
      });
  }, []);

  if (!products) return <h3 className="cargando">Cargando productos...</h3>;

  const aplicarFiltros = () => {
    if (!filtrosAplicar && !busqueda) return products; //si no hay filtros, devuelve todos los productos

    const { categoria, precioMin, precioMax } = filtrosAplicar; // desestructuramos los filtros

    return products.filter((p) => {
      const cumpleCategoria = !categoria || categoria === "Todas" || p.categoryName === categoria;
      const cumplePrecioMin = !precioMin || p.price >= precioMin;
      const cumplePrecioMax = !precioMax || p.price <= precioMax;
      return cumpleCategoria && cumplePrecioMin && cumplePrecioMax;
    });
  };

  const productosFiltrados = aplicarFiltros().filter( // solo los activos y con stock
    (p) => p.active && p.stock > 0 
    && (sale ? p.priceDescuento > 0 : true) // se muestran los que tienen precio descuento o todos (con el true)
    && (!busqueda || // si no hay busqueda, muestra todo (rompia si no)
   p.name.toLowerCase().includes(busqueda.toLowerCase()) || p.description.toLowerCase().includes(busqueda.toLowerCase())));

  return (
    <>
      <div className="product-list">
        {productosFiltrados
        .map((product) => (
          <ProductComponent
            key={product.id} // mandamos mediante props los datos que vamos a renderizar
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            priceDescuento={product.priceDescuento}
            discountEndDate={product.discountEndDate}
            categoryId={product.categoryId}
            categoryName={product.categoryName}
            imageUrls={product.imageUrls}
            stock={product.stock}
            active={product.active}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;