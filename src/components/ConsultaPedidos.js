import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DetallePedido from './DetallePedido';

const API_URL = "https://test-backend.xyz"

/* Ignora esto Falta manejo de errores aca, pero empecemos por lo basico */
const fetchErrorHandle = (response) => response.status === 200
    ? Promise.resolve(response)
    : response.json().then(data => Promise.reject({response, data}));

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
    
    const procesoBackEnd = {
        traerPedidos,
        traerPedido,
    }

function ConsultaPedidos(props) {

    const [pedidos, setPedidos] = useState([])
    const [cargandoPersonajes, setCargandoPersonajes] = useState(false)

    useEffect(() =>{
        traerPedidos()
        .then (productos1 => setPedidos(productos1))
        
    },[])

  return (
     <>
    <div>Tabla Pedidos
        <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/*<!-- head -->*/}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Nro</th>
        <th>Fecha y Hora</th>
        <th>Cantidad de Productos</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {/*<!-- row 1 -->*/}
      {
    //funcion.funcion.carrito.map( producto => <ProductoCarrito key={producto.id} producto={producto} quitarHandler={funcion.funcion.quitarProductoCarrito}></ProductoCarrito>)
    pedidos.map( pedido => 
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                {//<img src={pedido.imagenUrl} alt="Avatar Tailwind CSS Component" />
                }
              </div>
            </div>
            <div>
              <div className="font-bold">{pedidos.indexOf(pedido)+1}</div>
              <div className="text-sm opacity-50"></div>
            </div>
          </div>
        </td>
        <td>
        {pedido.fecha + " " + pedido.hora}
          
          <span className="badge badge-ghost badge-sm">No se que es esto</span>
        </td>
        <td>{pedido.items.length}</td>
        <th>
          <Link to={`/DetallePedido/${pedido.id}`} className="btn btn-primary">Detalle</Link>
        </th>
      </tr>)}
    </tbody>
    
  </table>
  </div>
    </div>
     </>
  )
}

export default ConsultaPedidos