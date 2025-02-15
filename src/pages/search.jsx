import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/context";
import FilterGif from "../components/filter-gfi";
import Gif from "../components/gif";

const Search = ()=>{

    const[searchResults,setSearhResult] = useState([])
    const{query} = useParams()
    const {gf, filter} = GifState()

    console.log(searchResults,gf)

    const fetchSearchResults = async ()=>{

        const {data} = await gf.search(query,{
            sort:'relevant',
            lang:'en',
            type:filter,
            limit:20,
        })
        setSearhResult(data)
    }

    useEffect(()=>{
        fetchSearchResults()
    },[filter])



    return (
        <div className="my-4">
            <h2 className="text-5cl pb-3 font-extrabold ">{query}</h2>
            <FilterGif alignLeft={true}/>
           {
            searchResults.length > 0 ? (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
                    {
                        searchResults.map((gif)=>{
                            return <Gif gif={gif} key={gif.id}/>
                        })
                    }
                </div>
            ):
            (
                <span> No GIFs found for {query}. Try searching for Stickers instead?</span>
            )
           }
        </div>
    )
}
export default Search