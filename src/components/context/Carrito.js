import { createContext, useState } from "react";

const CarritoGlobal = createContext ([])

const CarritoProvider = ({children}) => {
    
    const [acumuladorCarrito,setAcumuladorCarrito] = useState([])
   
    const agregarAlCarrito = (newProduct) => {
        setAcumuladorCarrito (acumuladorCarrito => acumuladorCarrito.concat(newProduct))
    }

    const logicaCarrito ={
        acumuladorCarrito,
        agregarAlCarrito
    }

return(
    <CarritoGlobal.Provider value={logicaCarrito}>
    {children}
    </CarritoGlobal.Provider>
)


}

export {CarritoGlobal,CarritoProvider}