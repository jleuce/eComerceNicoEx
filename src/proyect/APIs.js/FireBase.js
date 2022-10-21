import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import Home from '../components/Home';

function Firebase() {
    //HOOKs
    //Hook para saber si el usuario y su contraseña es correcto
    const [loginOk, setLoginOk ] = useState (false);
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
            console.log("funcion existe usuario");

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
                    
                }else{
                    console.log("Contraseña Incorrecta");
                    }
                } )
                }else{
                    console.log("Usuario No existe");
                    }
                } )
            
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

    const logicaUsuario = {
        existeUsuario,
        loginOk,
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
    
  return (
<Home logPed={logicaPedidos} logPro={logicaProductos} logUsu={logicaUsuario}></Home>
  )
}
export default Firebase