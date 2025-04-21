import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Cart from './components/Cart/Cart.jsx'
import Products from './components/Products/Products.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Categories from './components/Categories/Categories.jsx'
import Brands from './components/Brands/Brands.jsx'
import Layout from './components/Layout/Layout.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export default function App() {
 
  let routers = createBrowserRouter([
    {path: '' ,element : <Layout /> , children : [
     {index : true , element : <Home />} , 
     {path : 'cart' , element : <Cart/> } , 
     {path : 'brands' , element : <Brands/> } , 
     {path : 'categories' , element : <Categories/> } , 
     {path : 'products' , element : <Products/> } , 
     {path : 'register' , element : <Register/> } , 
     {path : 'login' , element : <Login/> } ,
     {path : '*' , element : <NotFound/> } ,
    ]}
  ])


  return <>
  <RouterProvider router={routers}></RouterProvider>
  </>
}
