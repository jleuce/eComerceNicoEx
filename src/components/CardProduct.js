import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { carritoGlobal } from './context/Carrito'

function CardProduct(props) {

    function agregar() {
        props.funcion.funcion.agregarProductoCarrito(props.producto)
    }
    function quitar() {
        //props.agregarCarritoHandler(props.personaje)
    }

  return (
    <div className="Card">
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={props.producto.imagenUrl} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.producto.nombre}</h2>
                <p>{props.producto.id}</p>
                <p>{`$${props.producto.precio}`}</p>
                <p>{`Stock:${props.producto.stock}`}</p>
                <li>{props.producto.descripcion}</li>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={agregar}>Agregar al carrito</button>
                    <button className="btn btn-primary" onClick={quitar}>Quitar al carrito</button>
                    <Link to={`/detalle/${props.producto.id}`} className="btn btn-secondary">Ir al detalle</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardProduct