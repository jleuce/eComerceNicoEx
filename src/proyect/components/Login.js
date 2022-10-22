import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function Login({props}) {
  // en las props viene el objeto logUsuario con: funciones existeUsuario, deslogin || hooks loginOk,usuarioLogeado,
    
    const estaLogueado = props.loginOk;
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        props.existeUsuario(data.usuario,data.contraseña)
    }

    if (estaLogueado === false){
  return (
<>
<form onSubmit={handleSubmit(onSubmit)}>
<div>
    <label>Usuario</label>
    <input placeholder="Type here" className="input input-bordered w-full max-w-xs" type="text" {...register("usuario")}/>
</div>
<div>
    <label>Contraseña</label>
    <input placeholder="Type here" className="input input-bordered w-full max-w-xs" type="text" {...register("contraseña")}/>
</div>
<div>
    <input className="btn btn-outline" type="submit" value="Enviar"/>
</div>
</form>
</>
  )
}
else{
return(
<>
<div>Ya esta logueado {props.usuarioLogeado}</div>
</>
)
}
}
export default Login