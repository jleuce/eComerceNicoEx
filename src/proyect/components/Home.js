import React, { useEffect, useState } from 'react'

function Home({logPed,logPro,logUsu}) {
    
    const logicaCarrito = {}
        //Hooks carrito =[{id producto, cantidad seleccionada y precio}]
        const [carrito, setCarrito] = useState([]);
        //function agregar al carrito
        const addCarrito = (loteCarrito) => {
            setCarrito([...carrito,loteCarrito])
        }
        //function eliminar producto del carrito
        const quitCarrito = (idProductoEnCarrito) => {
            const newCarrito = carrito.filter( e => e != idProductoEnCarrito )
            setCarrito(newCarrito)
        }
        //function borrar todo del carrito
        const limpiarCarrito = () => {
            setCarrito([])
        }
        //function agregar cantidad a un producto del carrito
        const addCantCarrito = (idProductoEnCarrito, cantidad) => {
            const cantidadStock = logPro.prodcutos.stock
            if (cantidad <= cantidadStock){
                const elementoEnCarrito = {...(carrito.find(e => e.id == idProductoEnCarrito))}
                elementoEnCarrito.cantidadSeleccionada = cantidad
                const newCarrito = carrito.filter( e => e != idProductoEnCarrito )
                setCarrito ([...newCarrito,elementoEnCarrito])
            }else{
                console.log("estas queriendo agregar mas que el disponible")
            }
        }
        //function restar cantidad a un producto del carrito
        const resCantCarrito = (idProductoEnCarrito, cantidad) => {
            if (cantidad != 0){
                const elementoEnCarrito = {...(carrito.find(e => e.id == idProductoEnCarrito))}
                elementoEnCarrito.cantidadSeleccionada = cantidad
                const newCarrito = carrito.filter( e => e != idProductoEnCarrito )
                setCarrito ([...newCarrito,elementoEnCarrito])
            }else{
                quitCarrito(idProductoEnCarrito)
            }
        }

  return (
    <div>Home</div>
  )
}

export default Home