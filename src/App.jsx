import React, { useContext, useEffect } from 'react'
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
import UserContextProvider, { UserContext } from './Context/UserContext.js'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import WishList from './components/WishList/WishList.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'


export default function App() {
 
  let routers = createBrowserRouter([
    {path: 'Online-Shopping' ,element : <Layout /> , children : [
     {index : true , element : <ProtectedRoute><Home/></ProtectedRoute>} , 
     {path : 'cart' , element : <ProtectedRoute><Cart/></ProtectedRoute> } , 
     {path : 'brands' , element : <ProtectedRoute><Brands/></ProtectedRoute> } , 
     {path : 'categories' , element : <ProtectedRoute><Categories/></ProtectedRoute> } , 
     {path : 'products' , element :<ProtectedRoute><Products/></ProtectedRoute>  } , 
     {path : 'wishlist' , element :<ProtectedRoute><WishList/></ProtectedRoute>  } , 
     {path : 'register' , element : <Register/> } , 
     {path : 'login' , element : <Login/> } ,
     {path : 'productdetails/:id' , element : <ProductDetails/> } ,
     {path : '*' , element : <NotFound/> } ,
    ]}
  ])
  let {setUserToken} = useContext(UserContext)
 
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }
  } ,[])

  return <>
 
  <RouterProvider router={routers}></RouterProvider>
  
  </>
}
