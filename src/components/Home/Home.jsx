import React from 'react'
import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import {Helmet} from "react-helmet";
export default function Home() {


  return <div className="container-fluid px-5">
    < Helmet>
    <title>Fresh Cart</title>
    </Helmet>
    <MainSlider/>
    <FeaturedProducts />
    
  </div>
  
}
