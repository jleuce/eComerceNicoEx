import React from 'react'
import ProductoCarrito from './ProductoCarrito'

function Carrito({acumulador,quitarHandler}) {
  return (
    <div><div className="collapse">
    <input type="checkbox" className="peer" /> 
    <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      Carrito
    </div>
    <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
      {acumulador.map( personaje => <ProductoCarrito key={personaje.id} producto={personaje} quitarHandler={quitarHandler}></ProductoCarrito>)}
    </div>
  </div></div>
  )
}

export default Carrito