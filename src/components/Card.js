import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {

    function agregar() {
        props.agregarCarritoHandler(props.personaje)
    }


  return (
    <div className="Card">
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={props.personaje.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.personaje.name}</h2>
                <p>{props.personaje.id}</p>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={agregar}>Agregar al carrito</button>
                    <Link to={`/detalle/${props.personaje.id}`} className="btn btn-secondary">Ir al detalle</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card