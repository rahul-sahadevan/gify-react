import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/context'
import Gif from '../components/gif'
import { useEffect } from 'react'
import FollowOn from '../components/follow-on'
const Category = () => {
  const [result,setResult] = useState([])
  const {category} = useParams()
  const {gf} = GifState()
  console.log(result[0])
  const fetchResults = async ()=>{
  
          const {data} = await gf.gifs(category,category)
          setResult(data)
      }
  
      useEffect(()=>{
          fetchResults()
      },[category])

  return (

    <div className='flex flex-col sm:flex-row gap-5 my-4'>
      <div className='w-full sm:w-72'>
        {result.length >0 && <Gif gif={result[0]}/>}
        <span>Don&apos;t tell it to me, GIF it to me!</span>
        <FollowOn/>
        <div className='divider'></div>
      </div>
        <div>
          <h2 className='text-4xl pb-1 font-extrabold capitalize'>
            {category.split('-').join(' & ')} GIFs
          </h2>
          <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
          </h2>

          {result.length > 0 && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
              {result.slice(1).map((gif) => (
                <Gif gif={gif} key={gif.id} />
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default Category
