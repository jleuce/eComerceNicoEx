import React, { useEffect } from 'react'

function Favoritos({lgFa,lgUs,lgPr}) {
  useEffect(() =>{
    if (lgUs.loginOk === true ){
    lgFa.traerFavoritosDeUsuario(lgUs.usuarioLogeado);
    lgPr.traerProductos();
    }
  },[])


  if (lgUs.loginOk === true && lgPr.loadingProductos === false){

  if (lgFa.loadingFavoritos === true) {
    return(
      <div>cargando....</div>
    )
  }
  else {
    return (
      <>
      {lgFa.favoritos.map( e => <li>{(lgPr.productos.find(p => p.id == e.id)).producto}</li>)}
      </>
    )
  }
  }else{
    return (<div>Si queres ver favoritos logueate amigo</div>)
  }
}

export default Favoritos