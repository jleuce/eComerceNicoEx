import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from './Loader'


function DetallePedido() {
  
  const {id} = useParams ()
    const [cargandoPagina,setCargandoPagina] = useState (false)
    const API_URL = "https://test-backend.xyz"

/* Ignora esto Falta manejo de errores aca, pero empecemos por lo basico */
const fetchErrorHandle = (response) => response.status === 200
    ? Promise.resolve(response)
    : response.json().then(data => Promise.reject({response, data}));

//backend nico

    const traerPedido = (idPedido) =>{
        return fetch(`${API_URL}/pedidos/${idPedido}`)
            .then(fetchErrorHandle)
            .then(response => response.json())
            .then(responseObject => responseObject.pedido);
    }

    const [pedido, setPedido] = useState({})

    useEffect (() =>{
        setCargandoPagina(false)
        traerPedido(id)
            .then ( p => {
                setPedido(p)
                console.log(pedido)
                
    })
    .then(() => setTimeout(() => {
    setCargandoPagina(true)   
    }, 3000))          
    }, [])

    if (cargandoPagina === false) {
        return <Loader></Loader>
    }

    return (
    <>
    <div>
    <Link className='btn btn-primary' to='/ConsultaPedidos'>Volver a pedidos</Link>
    </div>
      <div>Items en el pedido: {pedido.items.map(e => <li>{e.cantidad}</li>)}
      </div>
    </>
    )
}

export default DetallePedido