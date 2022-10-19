import React, { useEffect } from 'react'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';


const Test001 = () => {

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

  return (
    <div>test001</div>
  )
}

export default Test001