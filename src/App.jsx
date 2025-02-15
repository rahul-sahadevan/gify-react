import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Home from "./pages/home";
import Category from "./pages/category";
import Search from "./pages/search";
import GifPage from "./pages/single-gif";
import Favriotes from "./pages/favriots";
import GifProvider from "./context/context";
import Header from "./components/header";



const router = createBrowserRouter([
  {
    element:<AppLayout/>,

    children: [
      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/:category',
        element:<Category/>,
      },
      {
        path:'/search/:query',
        element:<Search/>,
      },
      {
        path:'/:type/:slug',
        element:<GifPage/>,
      },
      {
        path:'favriotes',
        element:<Favriotes/>,
      },
     
    ]
  }
])


const App =()=>{
  return (
    <GifProvider>
      
      <RouterProvider router={router}/>
    </GifProvider>
  )
}
export default App