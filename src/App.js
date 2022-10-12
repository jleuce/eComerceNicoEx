import './App.css';
import RickMortyAPI from './components/apis/RickMortyAPI';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { useEffect, useState } from 'react'
import Carrito from './components/Carrito';
import Test01 from './components/Test01';
import Detalle from './components/Detalle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BackEndNico from './components/apis/BackEndNico';
import { carritoGlobal } from './components/context/Carrito';
function App() {

  const [acumuladorCarrito, setAcumuladorCarrito] = useState([])
  const [carrito,setCarrito] = useState([])
  
  const agregarProductoCarrito = (producto) => {
    const newCarrito = [...carrito, producto];
    setCarrito (newCarrito);
    console.log("ejecute agregar producto carrito")
    console.log(carrito)
  }

  const quitarProductoCarrito = (producto) => 
  {
    const itemsNoEliminar = carrito.filter( elemento => elemento.id != producto.id )
    setAcumuladorCarrito(itemsNoEliminar)
  }
  const procesoCarrito = {
    carrito,
    agregarProductoCarrito,
    quitarProductoCarrito,
  }
  function agregarItemCarrito(producto) {
    const newCarrito = [...acumuladorCarrito, producto];
    setAcumuladorCarrito (newCarrito);
    
  } 
  function quitar(producto) {
    const itemsNoEliminar = acumuladorCarrito.filter( elemento => elemento.id != producto.id )
    setAcumuladorCarrito(itemsNoEliminar)
    console.log("funcion quitar")
  }

 
  return (
    <div>
    
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path={'/nico'} element={<BackEndNico funcion={procesoCarrito}/>}/>  
    <Route path={'/hola'} element={<Test01/>}/>  
    <Route path={'/carrito'} element={<Carrito acumulador={acumuladorCarrito} quitarHandler={quitar}/>}/>
    <Route path={'/ram'} element={ <RickMortyAPI agregarCarritoHandler={agregarItemCarrito} acumulador={acumuladorCarrito}></RickMortyAPI>}/>
    <Route path={'/Detalle/:id'} element={<Detalle></Detalle> }></Route>
    </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;