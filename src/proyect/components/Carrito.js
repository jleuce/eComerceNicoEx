import React from 'react'
import CarritoProduct from './CarritoProduct'

function Carrito({lgCa,lgPe,lgUs}) {
  // lgCa trae {} logicaCarrito hook carrito, f() addCarrito([loteCarrito]) quitCarrito = (idProductoEnCarrito) limpiarCarrito() addCantCarrito = (idProductoEnCarrito, cantidad) resCantCarrito = (idProductoEnCarrito, cantidad)
  const comprar = () => {
    if (lgCa.carrito.length > 0){
    lgPe.generarPedidoUsuario(lgCa.carrito,lgUs.usuarioLogeado)
    alert("mira la fecha de tu compra en VER PEDIDOS")
    lgCa.limpiarCarrito()
    }
  }
  return (
      <div><div className="collapse">
      <input type="checkbox" className="peer" /> 
      <button className="btn btn-primary" onClick={lgCa.limpiarCarrito}>Limpiar carrito</button>
      <button className="btn btn-primary" onClick={comprar}>Comprar</button>
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        Carrito
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
        {lgCa.carrito.map( e => <CarritoProduct props={e} lgCa={lgCa}></CarritoProduct>)}
      </div>
    </div></div>
  )
}

export default Carrito