import { useEffect, useState } from "react";
import ProductComponent from "./ProductComponent";

const CardList = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4002/products/") // mapeamos el endpoint de los productos
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
      });
  }, []);

  return (
    <>
      <h1>Publicaciones</h1>
      <div>
        {products.filter((product) => product.active === true) // solo los activos
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
            imageUrls={product.imageUrls}
            stock={product.stock}
            active={product.active}
          />
        ))}
      </div>
    </>
  );
};

export default CardList;