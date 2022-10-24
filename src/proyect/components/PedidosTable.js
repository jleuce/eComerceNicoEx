import React from 'react'

function PedidosTable({lgPe}) {
    console.log(lgPe)
    return(
    <>
    <tbody>
    <tr>
        <th>1</th>
        <td>{lgPe.fechaPedido}</td>
        <td>{lgPe.usuario}</td>
        <td>{lgPe.totalProductos}</td>
        <td>{lgPe.id}</td>
        <button>proximamente</button>
      </tr>
    </tbody>
    </>
    )
  
}

export default PedidosTable