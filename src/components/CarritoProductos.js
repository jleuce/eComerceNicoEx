import React from 'react'
import ProductoCarrito from './ProductoCarrito'
import TablaCarrito from './TablaCarrito'

function CarritoProductos({funcion}) {
  console.log("soy una funcion")
  console.log(funcion.funcion)
  return (
    <div><div className="collapse">
    <input type="checkbox" className="peer" /> 
    <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      Carrito
    </div> <button className="btn btn-primary">Comprar</button>
    <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
      {/*funcion.funcion.carrito.map( producto => <ProductoCarrito key={producto.id} producto={producto} quitarHandler={funcion.funcion.quitarProductoCarrito}></ProductoCarrito>)*/}
      <TablaCarrito prop={funcion}></TablaCarrito>
    </div>
  </div></div>
  )
}

export default CarritoProductos