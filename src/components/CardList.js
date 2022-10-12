import React from 'react'
import Card from './Card'
import { useEffect, useState } from 'react'

function CardList({personajes,agregarCarritoHandler,personajesElegidos}) {

  const personajesFiltrados = personajes.filter(
    (personaje) => {
      return personajesElegidos.find( elegido => elegido.id == personaje.id ) === undefined
    }
  )
  //const [personajesFiltrados, setPersonajesFiltrados] = useState([])
  //setPersonajesFiltrados( personajes.filter(personaje => personaje.id != personajesElegidos.id))
  
  return (
    <div className="CardList">
        {personajesFiltrados.map( personaje => (
          <Card
            key={personaje.id}
            personaje={personaje} 
            agregarCarritoHandler={agregarCarritoHandler}
          ></Card>
        ))}
    </div>
  )
}

export default CardList