import React from 'react'
import ProductoCarrito from './ProductoCarrito'
import TablaCarrito from './TablaCarrito'

function CarritoProductos({funcion,procesoBackEnd}) {
  //console.log("soy una funcion")
  //console.log(funcion.funcion)

  const ejecutarBackEnd = () =>{
    console.table(funcion.funcion.carrito)
    const pedido = {items: funcion.funcion.carrito.map( item => ({cantidad:1,producto_id:item.id}))}
    console.log(pedido);
    procesoBackEnd.crearPedido(pedido)
    procesoBackEnd.traerPedidos()
    .then((pedidos) => {
        console.log("Hay un total de " + pedidos.length + " pedidos", pedidos);
    });

  }
  const itemsEnCarrito = funcion.funcion.carrito.length != (0) ? `Items seleccionados: (${funcion.funcion.carrito.length})` : "Esta Vacio" ;
  return (
    <div><div className="collapse">
    <input type="checkbox" className="peer" /> 
    <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      Carrito
      <p className="btn btn-primary">{ itemsEnCarrito }</p>
    </div> <button className="btn btn-primary" onClick={ejecutarBackEnd}>Comprar</button>
    <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
      {/*funcion.funcion.carrito.map( producto => <ProductoCarrito key={producto.id} producto={producto} quitarHandler={funcion.funcion.quitarProductoCarrito}></ProductoCarrito>)*/}
      <TablaCarrito prop={funcion}></TablaCarrito>
    </div>
  </div></div>
  )
}

export default CarritoProductos