import React, { useEffect } from 'react'

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
    <p>por ahora muestro todos despues los vinculo al usuario</p>
    {lgPe.pedidos.map( e => <li>{e.fechaPedido}</li>)}
    </div>
    )
  }
}

export default Pedidos