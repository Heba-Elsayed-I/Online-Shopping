import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Register from '../Register/Register'


export default function Layout() {
  return <>
  <Navbar/>
   <div className="contsiner">
   <Outlet/>
   </div>
  
  <Footer/>
  </>
}
