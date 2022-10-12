import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Detalle() {

const {id} = useParams ()

const traerPersonaje = () => {
    
    const URL = `https://rickandmortyapi.com/api/character/${id}`;
    return fetch (URL)
        .then(response => {
            return response.json()
        })
        .then (res =>{
            return (res);
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
    }

const [personaje, setPersonaje] = useState({})

    useEffect (() =>{

        traerPersonaje()
            .then ( personaje => {
                setPersonaje(personaje)
                console.log(personaje)
    })
            
    }, [])






  return (
    <div>Detalle: {personaje.name}</div>
  )
}

export default Detalle