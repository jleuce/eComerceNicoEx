import React, { useEffect } from 'react'

function Favoritos({lgFa,lgUs}) {
  useEffect(() =>{
    if (lgUs.loginOk === true ){
    lgFa.traerFavoritosDeUsuario(lgUs.usuarioLogeado);
    }
  },[])

  if (lgUs.loginOk === true){
  if (lgFa.loadingFavoritos === true) {
    return(
      <div>cargando....</div>
    )
  }
  else {
    return (
      <>
      {lgFa.favoritos.map( e => <li>{e.usuario}</li>)}
      </>
    )
  }
  }else{
    return (<div>Si queres ver favoritos logueate amigo</div>)
  }
}

export default Favoritos