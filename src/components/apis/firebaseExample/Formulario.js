import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';

function Formulario(props) {

    const render = false;

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        existeProductoEnColeccion(data.usuario)
    }

    useEffect(() => {
        getItem()
        getCollection()
        existeProducto('cebolla')
    },[])
//Consultar documento especifico
    const getItem = () => {
        const db = getFirestore()
        const docRef = doc(db, 'Items','R6ye0rGIwMKTSOEJH5FT')
        //getDoc( docRef).then( res => console.log(res.data()) )
    }
//Consultar la coleccion
    const getCollection = () => {
        const db = getFirestore()
        const colRef = collection(db, 'Items')
        getDocs(colRef).then( res => {
            const data = res.docs.map( e => ({id: e.id, ...e.data()}))
            //console.log(data)
        } )
    }
        
//Querys
    const existeProducto = (producto) => {
        const db = getFirestore()
        const colRef = collection(db, 'Items')
        const q = query(colRef,where('producto','==',producto))
        getDocs(q).then( res => {
            const data = res.docs.map( e => ({id: e.id, ...e.data()}))
            console.log(data)
        } )

    }
    const existeProductoEnColeccion = (producto) => {
        const db = getFirestore()
        const colRef = collection(db, 'Items')
        const q = query(colRef,where('producto','==',producto))
        getDocs(q).then( res => {
            const data = res.docs.map( e => ({id: e.id, ...e.data()}))
            if (data.length != 0){
            console.log("existe")}else{
            console.log("no existe");
            }
            console.log(data)

        } )
    }

    // generar pedidos

   
        const putOrder = () => {
            const user = {name: "Luis",phone:"123",email:"luis@gmail.com"}
            const items = ["iphone", "android"]

            const order = {
                buyer: user,
                items: [],
                total:2
            }

            const db = getFirestore()
            const ordersCollection = collection( db, "Pedidos")
            addDoc( ordersCollection, order).then(res => {console.log(res)})

        }

        const updateOrder = () => {
            const user = {name: "Luis",phone:"123",email:"luis@gmail.com"}
            const items = ["iphone", "android"]

            const order = {
                buyer: user,
                items: [],
                total:2
            }

            const db = getFirestore()
            const ordersCollection = collection( db, "orders")
            const orderDoc = doc( ordersCollection, "5YzT0ApWBYkPsa9OiYN3")
            updateDoc(orderDoc, {item: ["hola"]})

        }

    if (render === true){
  return (
<>
<form onSubmit={handleSubmit(onSubmit)}>
<div>
    <label>Usuario</label>
    <input type="text" {...register("usuario")}/>
</div>
<div>
    <label>Contrase??a</label>
    <input type="text" {...register("contrase??a")}/>
</div>
<div>
    <input type="submit" value="Enviar"/>
</div>
</form>
</>
  )
}
else{
return(
<>
<div>hola</div>
<button type="button" onClick={putOrder}>crear registro</button>
<button type="button" onClick={updateOrder}>modificar registro</button>
</>
)
}
}
export default Formulario