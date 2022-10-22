import React from 'react'
import CarritoProduct from './CarritoProduct'

function Carrito({props}) {
  // lgCa trae {} logicaCarrito hook carrito, f() addCarrito([loteCarrito]) quitCarrito = (idProductoEnCarrito) limpiarCarrito() addCantCarrito = (idProductoEnCarrito, cantidad) resCantCarrito = (idProductoEnCarrito, cantidad)
  return (
      <div><div className="collapse">
      <input type="checkbox" className="peer" /> 
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        Carrito
      <button onClick={props.limpiarCarrito}>Limpiar carrito</button>
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
        {props.carrito.map( e => <CarritoProduct props={e} lgCa={props}></CarritoProduct>)}
      </div>
    </div></div>
  )
}

export default Carrito