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
    //Hooks favoritos
    const [favoritos, setFavoritos] = useState ([]);
    //Hooks Loadings consultas que traen informacion
    const [loadingProductos, setLoadingProductos] = useState (true);
    const [loadingPedidos, setLoadingPedidos] = useState (true);
    const [loadingFavoritos, setLoadingFavoritos] = useState (true);

    //Logica usuario
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
    //Logica favoritos
    //funcion agregar favorito
        const agregarFavorito = (idProducto,usuario) => {
            const favorito = {
                usuario: usuario,
                id: idProducto,
            }
            const db = getFirestore()
            const ordersCollection = collection( db, "Favoritos")
            addDoc(ordersCollection, favorito).then(res => {console.log(res)})
            console.log(`agregue a favoritos${favorito}`)
        }
    //funcion quitar favorito

    //funcion traer favoritos
    
        const traerFavoritosDeUsuario = (usuario) => {
            console.log("trayendo favoritos")
            setLoadingFavoritos(true);
            const db = getFirestore()
            const colRef = collection(db, 'Favoritos')
            const q = query(colRef,where('usuario','==',usuario))
            getDocs(q).then( res => {
                const data = res.docs.map( e => ({id: e.id, ...e.data()}))
                setFavoritos(data)
    } )
    .then(() => setLoadingFavoritos(false))
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
        } )
        .then(() => setLoadingProductos(false))
        }
    //funcion actualizar stock del producto en pedido
        const updateStockProducto = (idProducto, nuevoStock) => {
            console.log("ejecutando updateStockProducto")
            console.log(idProducto)
            console.log(nuevoStock)
            const db = getFirestore()
            const ordersCollection = collection( db, "Items")
            const orderDoc = doc( ordersCollection, idProducto)
                updateDoc(orderDoc, {stock: parseInt(nuevoStock)})
                console.log("producto actualizado")
        }
    //PEDIDOS
    //funcion generar pedido y vincularlo al usuario
        const generarPedidoUsuario = (pedido,usuario) => {
            console.log("generar pedido usuario")

            //const nuevoStock = productos.find(pr => pr.id == pe.id)- pe.cant;

            const order = {
                usuario: usuario,
                // productos va a ser un array de objetos que va a tener el id del producto, cantidad seleccionada y precio al momento
                productos: pedido,
                totalProductos:pedido.length,
                fechaPedido: (new Date()).toISOString().split('T')[0]
            }
            const db = getFirestore()
            const ordersCollection = collection( db, "Pedidos")
            addDoc( ordersCollection, order).then(res => {console.log(res)})
            console.log("pedido generado")
            pedido.forEach( function(pe) {
                const idProducto = pe.id;
                const nuevoStock = productos.find(pr => pr.id == pe.id).stock;
                updateStockProducto(idProducto, nuevoStock);
                })

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
    const logicaFavoritos = {
        agregarFavorito,
        traerFavoritosDeUsuario,
        favoritos,
        loadingFavoritos,
    };
    
    // Logica carrito
    //Hooks carrito =[{id producto, cantidad seleccionada y precio}]
    const [carrito, setCarrito] = useState([]);
    // aca tengo que poner objetos con id,cant
    //function agregar al carrito
        const addCarrito = (loteCarrito) => {
            console.log(carrito.find(p => p.id === loteCarrito.id))
            if((carrito.find(p => p.id === loteCarrito.id)) == undefined){
            setCarrito([...carrito,loteCarrito])
            const productoEditado = productos.find(p => p.id === loteCarrito.id)
            productoEditado.stock -= loteCarrito.cant
            const newProductos = productos.filter(p => p.id != loteCarrito.id)
            setProductos([...newProductos,productoEditado])
            console.log(`agregaste al carrito: ${loteCarrito}`)
            }else{
                const eCarritoEditado = carrito.find(p => p.id === loteCarrito.id)
                eCarritoEditado.cant += loteCarrito.cant
                const newECarrito = carrito.filter(p => p.id != loteCarrito.id)
                setCarrito([...newECarrito,eCarritoEditado])

                const productoEditado = productos.find(p => p.id === loteCarrito.id)
                productoEditado.stock -= loteCarrito.cant
                const newProductos = productos.filter(p => p.id != loteCarrito.id)
                setProductos([...newProductos,productoEditado])
                console.log(`agregaste al carrito:`)  
                console.log(loteCarrito)
                console.log(`carrito:`)
                console.log(carrito)
            }

        }
        //function eliminar producto del carrito
        const quitCarrito = (idProductoEnCarrito,cant) => {
            const productoEditado = productos.find(p => p.id === idProductoEnCarrito)
            productoEditado.stock += cant
            const newProductos = productos.filter(p => p.id != idProductoEnCarrito)
            setProductos([...newProductos,productoEditado])

            const newCarrito = carrito.filter( e => e.id != idProductoEnCarrito )
            setCarrito(newCarrito)

        }
        //function borrar todo del carrito
        const limpiarCarrito = () => {
            setCarrito([])
            traerProductos()
        }
        //function agregar cantidad a un producto del carrito
        const addCantCarrito = (idProductoEnCarrito, cantidad) => {
            console.log("ejecutar addCantCarrito")
            console.log(cantidad)

            const producto = logicaProductos.productos.find(e => e.id == idProductoEnCarrito)
            const cantidadStock = producto.stock
            if (cantidad <= cantidadStock){
                const elementoEnCarrito = {...(carrito.find(e => e.id == idProductoEnCarrito))}
                elementoEnCarrito.cant += 1
                const newCarrito = carrito.filter( e => e.id != idProductoEnCarrito )
                setCarrito ([...newCarrito,elementoEnCarrito])

                const newElemento = productos.find(p => p.id === idProductoEnCarrito)
                newElemento.stock -= cantidad
                const newProductos = productos.filter(p => p.id != newElemento.id)
                setProductos([...newProductos,newElemento])

            }else{
                console.log("estas queriendo agregar mas que el disponible")
            }
            
        }
        //function restar cantidad a un producto del carrito
        const resCantCarrito = (idProductoEnCarrito, cantidad) => {
            console.log("ejecutar resCantCarrito")
            const elementoEnCarrito = {...(carrito.find(e => e.id == idProductoEnCarrito))}
            elementoEnCarrito.cantidadSeleccionada -= cantidad
            if (cantidad != 0){
                const newCarrito = carrito.filter( e => e.id != idProductoEnCarrito )
                setCarrito ([...newCarrito,elementoEnCarrito])
            }else{
                quitCarrito(idProductoEnCarrito)
            }
        }
        //Objeto para pasar props de logica carrito
        const logicaCarrito = {
            carrito,
            addCarrito,
            quitCarrito,
            addCantCarrito,
            resCantCarrito,
            limpiarCarrito,
        }
  return (
    <div>
        <BrowserRouter>
        <NavBar props={logicaUsuario}></NavBar>
        <Routes>
        <Route path={'/productos'} element={<ProductsList 
        lgPr={logicaProductos} 
        lgCa={logicaCarrito} 
        lgFa={logicaFavoritos} 
        lgUs={logicaUsuario}
        lgPe={logicaPedidos}/>}
        />
        <Route path={'/productos/detalle/:id'} element={<ProductDetail/> }></Route>
        <Route path={'/pedidos'} element={<Pedidos 
        lgPe={logicaPedidos}
        />}></Route>
        <Route path={'/pedidos/detalle/:id'} element={<PedidosDetail/>}></Route>
        <Route path={'/favoritos'} element={<Favoritos
        lgFa={logicaFavoritos}
        lgUs={logicaUsuario}
        lgPr={logicaProductos}
        />}></Route>
        <Route path={'/login'} element={<Login props={logicaUsuario}/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Home