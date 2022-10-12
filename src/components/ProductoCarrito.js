import React from 'react'

function ProductoCarrito(props) {

  function quitarProducto() {
    props.quitarHandler(props.producto);
  }
  return (
    <div>{props.producto.name}
    <button className="btn btn-primary" onClick={quitarProducto}>Eliminar</button>
    </div>
  )
}

export default ProductoCarrito