import React, { useEffect } from 'react'
import Carrito from './Carrito'
import ProductCard from './ProductCard'

function ProductsList({props}) {
  // props trae objeto logicaProductos funciones traerProductos,updateStockProducto, hooks productos{categoria,descripcion,imagen,precio,producto(nombre..),stock}, loadingProductos,
  console.log(props)

  useEffect(() => {
  props.traerProductos();
  },[])
  if (props.loadingProductos === true) {
    return(
      <div>cargando....</div>
    )
  }
  
  else {
    return (
      <>
      <Carrito></Carrito>
      <div className="CardList">
      {props.productos.map(e => <ProductCard props={e}></ProductCard>)}
      </div>
      </>
    )
  }
}

export default ProductsList