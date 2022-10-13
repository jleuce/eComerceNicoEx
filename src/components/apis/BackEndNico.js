import React, { useEffect, useState } from 'react'
import CardListProducts from '../CardListProducts';

const API_URL = "https://test-backend.xyz"

/* Ignora esto Falta manejo de errores aca, pero empecemos por lo basico */
const fetchErrorHandle = (response) => response.status === 200
    ? Promise.resolve(response)
    : response.json().then(data => Promise.reject({response, data}));

const traerPersonajes = () => {
    const URL = `${API_URL}/productos`
    return fetch (URL)
        .then(fetchErrorHandle)
        .then(response => {
            return response.json()
        })
        .then (res =>{
            console.log(res.productos)
            return (res.productos)
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
    }
//backend nico
    const traerPedidos = () => {
        return fetch(`${API_URL}/pedidos`)
            .then(fetchErrorHandle)
            .then(response => response.json())
            .then(responseObject => responseObject.pedidos);
    }
    
    const traerPedido = (idPedido) =>{
        return fetch(`${API_URL}/pedidos/${idPedido}`)
            .then(fetchErrorHandle)
            .then(response => response.json())
            .then(responseObject => responseObject.pedido);
    }
    
    const crearPedido = (datosPedido) =>{
        return fetch(
            `${API_URL}/pedidos`,
            {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosPedido)
                }
            )
            .then(fetchErrorHandle)
            .then(response => response.json())
            .then(responseObject => responseObject.pedido)
            .catch(err => {
                console.log("Ocurrio un error al crear pedido", err?.data);
                throw err;
            });
    }

    const procesoBackEnd = {
        traerPedidos,
        traerPedido,
        crearPedido,
    }

function BackEndNico(props) {

    const [productos, setProductos] = useState([])
    const [cargandoPersonajes, setCargandoPersonajes] = useState(false)

    useEffect(() =>{
        setCargandoPersonajes(true);

        traerPersonajes()
        .then (productos1 => setProductos(productos1))
            //.then (() => setCargandoPersonajes(false))
            
    },[])

  return (
      <CardListProducts
      procesoBackEnd={procesoBackEnd}
      productos={productos}
      funcion={props}
      > 
    </CardListProducts>
   
  )
}

export default BackEndNico