import React from 'react'

import { useEffect, useState } from 'react'
import CardProduct from './CardProduct'
import CarritoProductos from './CarritoProductos'

function CardListProducts({productos,funcion,procesoBackEnd}) {

  //const [personajesFiltrados, setPersonajesFiltrados] = useState([])
  //setPersonajesFiltrados( personajes.filter(personaje => personaje.id != personajesElegidos.id))
  
  return (
    <>
    <CarritoProductos funcion={funcion} procesoBackEnd={procesoBackEnd}></CarritoProductos>
    <div className="CardList">
      
        {productos.map( producto => (
          <CardProduct
            key={producto.id}
            producto={producto}
            agregarCarritoHandler={''}
            funcion={funcion}
          ></CardProduct>
        ))}
    </div>
    </>
  )
}

export default CardListProducts