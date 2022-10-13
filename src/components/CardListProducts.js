import React from 'react'

import { useEffect, useState } from 'react'
import CardProduct from './CardProduct'
import CarritoProductos from './CarritoProductos'
import { CarritoProvider } from './context/Carrito'

function CardListProducts({productos,funcion}) {

  //const [personajesFiltrados, setPersonajesFiltrados] = useState([])
  //setPersonajesFiltrados( personajes.filter(personaje => personaje.id != personajesElegidos.id))
  
  return (
    <>
    <CarritoProductos funcion={funcion}></CarritoProductos>
    <CarritoProvider className="CardList">
      
        {productos.map( producto => (
          <CardProduct
            key={producto.id}
            producto={producto}
            agregarCarritoHandler={''}
            funcion={funcion}
          ></CardProduct>
        ))}
    </CarritoProvider>
    </>
  )
}

export default CardListProducts