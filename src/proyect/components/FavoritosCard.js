import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function FavoritosCard({props}) {
  
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
                <p>{props.stock}</p>
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
                    {lgUs.loginOk?<button className="btn btn-primary" onClick={agregarAFavoritos} >Agregar a favoritos</button>:<Link to='/Login' button className="btn btn-primary">Loguearse para agregar a favoritos</Link>}
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

export default FavoritosCard