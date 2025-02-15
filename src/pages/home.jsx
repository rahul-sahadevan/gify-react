import React, { useEffect } from "react";
import Header from "../components/header";
import { GifState } from "../context/context";
import banner from '../assets/banner.gif'
import Gif from "../components/gif";
import FilterGif from "../components/filter-gfi";
const Home = ()=>{

    const {gf,gifs,setGifs,filter} = GifState()

    const fetchTrendingGifs = async ()=>{

        const {data} = await gf.trending({
            limit:20,
            type:filter,
            rating:'g'
        })

        setGifs(data)
    }

    useEffect(()=>{
        fetchTrendingGifs()
    },[filter])

    return (
        <div >
          <img src={banner} alt="earth banner" className="mt-2 rounded w-full" />
          <FilterGif showTrending={true}/>
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {
                gifs.map((gif)=>{
                    return <Gif gif={gif} key={gif?.title}/>
                })
            }
          </div>
        </div>
    )
}
export default Home