const ProductComponent = ({id, name,description, price, priceDescuento,discountEndDate, categoryId, imageUrls,stock,active})=>{
    return(
        <>
        <div className="product-image">
            <img src={imageUrls[0]} alt={name} /> // elejimos la primera imagen y si no el nombre
        </div>
        <div className="product-info">
            <h3 className="product-name">{name}</h3>
            <p className="product-description">{description}</p>
            <p className="product-price">
            Precio: ${price}
            {priceDescuento && ( // si tiene precio descuento lo mostramos
                <span className="product-discount"> → ${priceDescuento}</span>
            )}
            </p>
        {discountEndDate && ( // si tiene fecha de descuento lo mostramos
          <p className="product-discount-date">
            Descuento hasta: {new Date(discountEndDate).toLocaleDateString()}
          </p>
        )}
        <p className="product-stock">Stock: {stock}</p>
        <p className="product-category">Categoría: {categoryId}</p>
        <p className="product-id">ID: {id}</p>
      </div>
        </>
    )
}

export default ProductComponent