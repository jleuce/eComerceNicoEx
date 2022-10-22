import React from 'react'

function CarritoProduct({props,lgCa}) {
  console.log(props)
  const sumar = () => {
    lgCa.addCantCarrito(props.id,props.cant)
  }
  const restar = () => {
    lgCa.resCantCarrito(props.id,props.cant)
  }
  const quitar = () => {
    lgCa.quitCarrito(props.id,props.cant)
  }

  return (
    <>
    <div>{props.id}</div>
    <div>{props.cant}</div>
    <button className="btn btn-primary" onClick={quitar}>Eliminar del carrito</button>
    </>
    
  )
}

export default CarritoProduct