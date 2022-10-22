import React from 'react'
import { Link } from 'react-router-dom'

function NavBar({props}) {
  // en las props viene el objeto logUsuario con: funciones existeUsuario, deslogin || hooks loginOk,usuarioLogeado,

  if (props.usuarioLogeado == "Invitado"){
    return (
      <div>
      <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Ecomerce JL</a>
        <Link to='/' className="btn btn-outline"> Home </Link>
        <Link to='/productos' className='btn btn-outline'>Ver productos</Link>
        <Link to='/Pedidos' className='btn btn-outline'> Ver pedidos</Link>
        <Link to='/Favoritos' className='btn btn-outline'> Ver Favoritos</Link>
      </div>
      <div className="flex-none">
      <a className="btn btn-ghost normal-case text-xl">Usuario: {props.usuarioLogeado}</a>
      <Link to='/Login' className="btn btn-outline">Loguearse</Link>
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </button>
      </div>
    </div>
    </div>
    )
  }else{
    return (
    <div>
      <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Ecomerce JL</a>
        <Link to='/' className="btn btn-outline"> Home </Link>
        <Link to='/productos' className='btn btn-outline'>Ver productos</Link>
        <Link to='/Pedidos' className='btn btn-outline'> Ver pedidos</Link>
        <Link to='/Favoritos' className='btn btn-outline'> Ver Favoritos</Link>
      </div>
      <div className="flex-none">
      <a className="btn btn-ghost normal-case text-xl">Usuario:{props.usuarioLogeado}</a>
      <button onClick={props.deslogin} className="btn btn-outline">Desloguearse</button>
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </button>
      </div>
    </div>
    </div>
    )
  }
}

export default NavBar