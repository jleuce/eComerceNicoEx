import { createContext,useState } from 'react';

const FavContext = createContext([])

const FavsProvider = ({children}) => {

    const [favs,setFavs] = useState([])

    const agregarFavorito = (fav) => {
        setFavs( favs => {
            return favs.concat(fav)
        } )
    }

    const quitarFavorito = (fav) => {
        //mas compleja
        setFavs( favs => {
            return favs.concat(fav)
        } )
    }


    const context = {
        favs,
        agregarFavorito,
        quitarFavorito,
    }

  return (
        <FavContext.Provider value = {context}>
            {children}
        </FavContext.Provider>
  )
}

export {FavContext,FavsProvider}