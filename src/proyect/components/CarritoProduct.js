import React from 'react'

function CarritoProduct({props,lgCa}) {
  const sumar = () => {
    lgCa.addCantCarrito(props.id,(1))
  }
  const restar = () => {
    lgCa.resCantCarrito(props.id,(1))
  }

  return (
    <>
    <div>{props.id}</div>
    <div>{props.cant}</div>
    <button onClick={sumar}>+</button>
    <button onClick={restar}>-</button>
    </>
    
  )
}

export default CarritoProduct