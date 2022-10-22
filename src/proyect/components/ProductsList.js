import React, { useEffect } from 'react'
import Carrito from './Carrito'
import ProductCard from './ProductCard'

function ProductsList({lgPr,lgCa}) {
  // lgPr trae objeto logicaProductos funciones traerProductos,updateStockProducto, hooks productos{categoria,descripcion,imagen,precio,producto(nombre..),stock}, loadingProductos,
  // lgCa trae {} logicaCarrito hook carrito, f() addCarrito([loteCarrito]) quitCarrito = (idProductoEnCarrito) limpiarCarrito() addCantCarrito = (idProductoEnCarrito, cantidad) resCantCarrito = (idProductoEnCarrito, cantidad)

  useEffect(() => {
  lgPr.traerProductos();
  },[])
  if (lgPr.loadingProductos === true) {
    return(
      <div>cargando....</div>
    )
  }
  
  else {
    return (
      <>
      <Carrito props={lgCa}></Carrito>
      <div className="CardList">
      {lgPr.productos.map(e => <ProductCard props={e} lgCa={lgCa}></ProductCard>)}
      </div>
      </>
    )
  }
}

export default ProductsList