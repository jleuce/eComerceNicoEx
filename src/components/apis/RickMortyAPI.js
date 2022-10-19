import React, { useEffect, useState } from 'react'
import CardList from '../CardList';
import { FavsProvider } from '../context/FavsContext';

const traerPersonajes = () => {
    const URL = "https://rickandmortyapi.com/api/character";

    return fetch (URL)
        .then(response => {
            return response.json()
        })
        .then (res =>{
            return (res.results);
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
    }

function RickMortyAPI(props) {

    const [personajes, setPersonajes] = useState([])
    const [cargandoPersonajes, setCargandoPersonajes] = useState(false)

    useEffect(() =>{
        setCargandoPersonajes(true);

        traerPersonajes()
            .then ( personajes => setPersonajes(personajes))
            .then (() => setCargandoPersonajes(false))
            
    },[])

    

  return (
    <FavsProvider>
    <CardList 
    personajes={personajes} 
    agregarCarritoHandler={props.agregarCarritoHandler}
    personajesElegidos={props.acumulador}
    ></CardList>
    </FavsProvider>
  )
}

export default RickMortyAPI