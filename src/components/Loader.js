import React, { useState } from 'react'


function Loader() {
  const [contador, setContador] = useState((0))
  
  const cargar = () =>{
  setContador(contador + 1)
  }

  const textoCargando = ['Cargando.','Cargando..','Cargando...']

    setTimeout(() => {
    cargar()
}, 1000)
setTimeout(() => {
  cargar()
}, 1000)
return (
  <>
<h1>{textoCargando[contador]}</h1>
<progress className="progress progress-secondary w-56" value={`${(contador+1)*25}`} max="100"></progress>
  </>
)
}

export default Loader