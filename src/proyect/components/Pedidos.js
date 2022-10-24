import React, { useEffect } from 'react'
import PedidosTable from './PedidosTable'

function Pedidos({lgPe}) {

  useEffect(() => {
    lgPe.traerPedidos()
  }, [])
  
  if (lgPe.loadingPedidos === true){
    return (
    <div>Cargando...</div>
    )
  }else{
    return(
    <div>
    <div className="overflow-x-auto">
    <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Fecha</th>
        <th>Usuario</th>
        <th>Cantidad Producto</th>
        <th>ID</th>
        <th>Ir a detalle</th>
      </tr>
    </thead>
    {lgPe.pedidos.map( e => <PedidosTable lgPe={e}></PedidosTable>)}
  </table>
</div>
    </div>
    )
  }
}

export default Pedidos