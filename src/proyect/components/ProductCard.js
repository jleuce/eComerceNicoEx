import React, { useState } from 'react'

function ProductCard({props,lgCa}) {
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0)
  const [cantidadStockMuestra, setCantidadStockMuestra] = useState(props.stock)
  
  const sumar = () => {
    if (cantidadStockMuestra > cantidadSeleccionada){
    setCantidadSeleccionada(cantidadSeleccionada + 1);
    }else{
        alert("no hay mas stock");
    }
  }
  const restar = () => {
    if (cantidadSeleccionada > 0){
    setCantidadSeleccionada(cantidadSeleccionada - 1);
    }
  }
  const agregarAlCarrito = () => {
    if (cantidadSeleccionada > 0 && cantidadStockMuestra > cantidadSeleccionada){
      //console.log(lgCa)
      lgCa.addCarrito({id:props.id, cant:cantidadSeleccionada})
      setCantidadSeleccionada(0)
      setCantidadStockMuestra(cantidadStockMuestra-cantidadSeleccionada)
    }
  }
  return (
  <div>
  {
    <div className="Card">
        <div className="card w-96 bg-base-100 shadow-xl">
        <p>Cartelito si no hay stock</p>            
            <figure className="px-10 pt-10">
                <img src={props.imagen} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.producto}</h2>
                <p>{cantidadStockMuestra}</p>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={agregarAlCarrito}>Agregar al carrito</button>
                    <button className="btn btn-primary" onClick={sumar} >+</button>
                    <button className="btn btn-primary" onClick={restar}>-</button>
                </div>
                <div>
                <p type="text">Cantidad elegida solo si es dif de 0, a ser un input para poder poner cantidad a mano solo numeros</p>
                </div>
                <div>
                <p type="text">{cantidadSeleccionada}</p>
                </div>
                <div className="card-actions">
                    <button className="btn btn-primary" >Agregar a favoritos o quitar si esta solo logueado</button>
                </div>
                <div className="card-actions">
                    <button className="btn btn-primary" >Ver detalle</button>
                </div>

            </div>
        </div>
    </div>
  }
  </div>
  )
}

export default ProductCard