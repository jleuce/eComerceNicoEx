import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import ProductDetail from './ProductDetail';
import ProductsList from './ProductsList';
import Pedidos from './Pedidos';
import PedidosDetail from './PedidosDetail';
import Favoritos from './Favoritos';
import Login from './Login';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';

function Home({logPed,logPro,logUsu}) {
    //Logica Base de datos

     //HOOKs
    //Hook para saber si el usuario y su contraseña es correcto
    const [loginOk, setLoginOk ] = useState (false);
    //Hooks con el usuario
    const [usuarioLogeado, setUsuarioLogeado] = useState ("Invitado");
    //Hook para guardar los productos
    const [productos, setProductos] = useState ([]);
    //Hook para guardar los pedidos
    const [pedidos, setPedidos] = useState ([]);
    //Hooks Loadings consultas que traen informacion
    const [loadingProductos, setLoadingProductos] = useState (true);
    const [loadingPedidos, setLoadingPedidos] = useState (true);
    

    //LOGIN
    // funcion verifica si existe el usuario cargado en el formulario
        const existeUsuario = (usuario,contraseña) => {
            console.log("ejecutando funcion existe usuario");

            const db = getFirestore()
            const colRef = collection(db, 'Usuarios')
                const q = query(colRef,where('usuario','==',usuario))
                getDocs(q).then( res => {
                    const data = res.docs.map( e => ({id: e.id, ...e.data()}))
                    if (data.length != 0){
                    console.log("Usuario Existe")

                    const db = getFirestore()
                    const colRef = collection(db, 'Usuarios')
                    const q = query(colRef,where('contraseña','==',contraseña))
                    getDocs(q).then( res => {
                    const data = res.docs.map( e => ({id: e.id, ...e.data()}))
                    if (data.length != 0){
                    console.log("Contraseña Correcta")
                    setLoginOk(true);
                    setUsuarioLogeado(usuario);
                    
                }else{
                    console.log("Contraseña Incorrecta");
                    }
                } )
                }else{
                    console.log("Usuario No existe");
                    }
                } )
            
        }
    //funcion deslogin
        const deslogin = () => {
            setUsuarioLogeado("Invitado");
            setLoginOk(false);
        }
    //PRODUCTOS
    //funcion traer productos
        const traerProductos = () => {
            setLoadingProductos(true);
            const db = getFirestore()
            const colRef = collection(db, 'Items')
            getDocs(colRef).then( res => {
                const data = res.docs.map( e => ({id: e.id, ...e.data()}))
                setProductos(data)
                console.log(productos)
        } )
        .then(() => setLoadingProductos(false))
        }
    //funcion actualizar stock del producto en pedido
        const updateStockProducto = (idProducto, nuevoStock) => {
            const db = getFirestore()
            const ordersCollection = collection( db, "Items")
            const orderDoc = doc( ordersCollection, idProducto)
                updateDoc(orderDoc, {stock: parseInt(nuevoStock)})
        }
    //PEDIDOS
    //funcion generar pedido y vincularlo al usuario
        const generarPedidoUsuario = (pedido,usuario) => {
            const order = {
                usuario: usuario,
                // productos va a ser un array de objetos que va a tener el id del producto, cantidad seleccionada y precio al momento
                productos: pedido.productos,
                totalProductos:pedido.productos.length,
                fechaPedido: (new Date()).toISOString().split('T')[0]
            }

            const db = getFirestore()
            const ordersCollection = collection( db, "Pedidos")
            addDoc( ordersCollection, order).then(res => {console.log(res)})
        }
    //funcion traer pedidos
        const traerPedidos = () => {
            setLoadingPedidos(true)
            const db = getFirestore()
            const colRef = collection(db, 'Pedidos')
                getDocs(colRef).then( res => {
                const data = res.docs.map( e => ({id: e.id, ...e.data()}))
                setPedidos(data)
                console.log(pedidos)
        } )
        .then(() => setLoadingPedidos(false))
    }
    //Objetos para pasar las props
    const logicaUsuario = {
        existeUsuario,
        deslogin,
        loginOk,
        usuarioLogeado,
    };
    const logicaProductos = {
        traerProductos,
        updateStockProducto,
        productos, // categoria,descripcion,imagen,precio,producto(nombre..),stock
        loadingProductos,
    };
    const logicaPedidos = {
        generarPedidoUsuario,
        traerPedidos,
        pedidos, // fechaPedido, productos: [{}], totalProductos, usuario
        loadingPedidos,
    };
    
    // Logica carrito
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
        //Objeto para pasar props de logica carrito
        const logicaCarrito = {}
  return (
    <div>
        <BrowserRouter>
        <NavBar props={logicaUsuario}></NavBar>
        <Routes>
        <Route path={'/productos'} element={<ProductsList props={logicaProductos}/>}/>
        <Route path={'/productos/detalle/:id'} element={<ProductDetail/> }></Route>
        <Route path={'/pedidos'} element={<Pedidos/>}></Route>
        <Route path={'/pedidos/detalle/:id'} element={<PedidosDetail/>}></Route>
        <Route path={'/favoritos'} element={<Favoritos/>}></Route>
        <Route path={'/login'} element={<Login props={logicaUsuario}/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Home