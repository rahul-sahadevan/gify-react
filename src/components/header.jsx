import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2'
import { GifState } from '../context/context'
import Category from '../pages/category'
import GifSearch from './gif-search'
// import '../App.css'
const Header = () => {

    const [categories, setCategories] = useState([])
    const[showCategories,setshowCategories] = useState(false)
    const {gf,filter ,setFilter ,favorites} = GifState()
    console.log(gf,filter ,setFilter ,favorites)


    const fetchGifCategories = async ()=>{

        const {data} = await gf.categories()
        setCategories(data)
    }

    useEffect(()=>{
        fetchGifCategories()
        // console.log(categories)
    },[])



  return (
    <nav>
        <div className='relative flex gap-4 justify-between items-center mb-2'>
            <Link to={'/'} className='flex gap-2'> 
                <img src={logo} alt="gigy-logo" className='w-8'/>
                <h1 className='text-5xl font-bold tracking-tight cursor-pointer'>GIPHY</h1>
            </Link>
        <div className='font-bold text-center flex items-center gap-2'>
            {/* render categories */}
            {
                categories?.slice(0,5)?.map((category,index)=>{
                    return(

                        <Link to={`/${category.name_encoded}`} key={category.name} className='px-4 py-1 gradient border-b-4 hidden lg:block'>
                            {category.name}
                        </Link>
                    )
                })
            }
            <button onClick={()=> setshowCategories(!showCategories)}>
                <HiEllipsisVertical size={35} className={`px-0.5 py-1 gradient ${
                    showCategories ? 'gradient-active' : ''} border-b-4 hidden lg:block`}/>
            </button>
            {/* favriots */}
            {
                favorites.length > 0 && (
                    <div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
                        <Link to={'/favriotes'}>Favriots GIFs</Link>
                    </div>

                )
            }
            <button>
                <HiMiniBars3BottomRight className='text-sky-400 lg:hidden block'/>
            </button>

        </div>
            {
                showCategories && (
                    <div className='absolute right-0 top-14 px-10 pt-6 w-full gradient-active z-20'>
                        <span className='text-3xl font-extrabold '>Categories</span>
                        <hr className='bg-gray-100 opacity-50 my-5' />
                        <div className='grid grid-cols-2 am:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-4'>
                            {
                                categories?.map((category) =>{
                                    return (
                                        <Link key={category.name} to={`/${category.name_encoded}`} className='font-bold'>{category.name}</Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
        <GifSearch/>
    </nav>
  )
}

export default Header
