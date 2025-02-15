import { GiphyFetch } from "@giphy/js-fetch-api";
import React, { Children, createContext, useContext, useEffect, useState } from "react";


const GifContext = createContext()


const GifProvider = ({children}) =>{

    const [gifs,setGifs]  = useState([])
    const [filter,setFilter] = useState('gifs')
    const [favorites,setFavorites]= useState([])

    const addToFavorites= (id)=>{
        if(favorites.includes(id)){
            const updatedFavorites = favorites.filter((itemid)=> itemid !== id)
            localStorage.setItem('favoritesGIFs',JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
        }
        else{
            const updatedFavorites = [...favorites]
            updatedFavorites.push(id)
            setFavorites(updatedFavorites)
        }
        console.log(id)
    }

    useEffect(()=>{
        const favorites = JSON.parse(localStorage.getItem('favoritesGIFs')) || []
        setFavorites(favorites)
    },[])

    const gf = new GiphyFetch(import.meta.env.VITE_GIFY_KEY)

    return (
        <GifContext.Provider value={{gf,gifs,setGifs,filter,setFilter,favorites,addToFavorites}}>{children}</GifContext.Provider>
    )
}

export const GifState = ()=>{
    return useContext(GifContext)
}

export default  GifProvider