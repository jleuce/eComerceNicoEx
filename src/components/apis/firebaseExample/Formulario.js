import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';

function Formulario(props) {

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

  return (
<>
<form onSubmit={handleSubmit(onSubmit)}>
<div>
    <label>Usuario</label>
    <input type="text" {...register("usuario")}/>
</div>
<div>
    <label>Contraseña</label>
    <input type="text" {...register("contraseña")}/>
</div>
<div>
    <input type="submit" value="Enviar"/>
</div>
</form>
</>
  )
}

export default Formulario