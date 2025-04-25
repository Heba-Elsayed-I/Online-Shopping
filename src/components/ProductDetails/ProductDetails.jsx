import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import Slider from "react-slick";
import {Helmet} from "react-helmet";
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
  var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow:false,
    
    autoplaySpeed:1000
  };
 const [detials, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  let {addToCart} = useContext(cartContext) 
  let {id} = useParams()
  async function getProductDetails(id){ 
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
    setLoading(false)
    
  }
  async function addItem(id){
    let {data} = await addToCart(id)
    if(data.status == 'success'){
     toast.success(data.message ,{
       icon: '👏',
     })
    }
   }
  useEffect(()=>{
    getProductDetails(id)
  },[])
  return <div className="container">
  {loading? 
   <div className="d-flex justify-content-center mt-5 ">
          <PulseLoader 
  color= "#008000"
  loading={true}
  size={50}
/>
   </div> :
    <>
    <Helmet>
      <title>{detials.title}</title>
    </Helmet>
   <div className="row align-items-center py-5">
    <div className="col-md-4">
    <Slider {...settings}>
    {detials.images.map(image => <img src={image} key={detials.id} className='w-100'  alt ={detials.title}/> )}
    </Slider>
    </div>
    <div className="col-md-8">
      <div className="details">
      <h3 className='h5'>{detials.title}</h3>
      <p className='py-3'>{detials.description}</p>
      <span className='font-sm text-main'>{detials.category.name}</span>
      <div className="d-flex py-3 justify-content-between align-items-center">
        <span className='font-sm'>{detials.price} EGP</span>
        <span className='font-sm'>
          <i className='fas fa-star rating-color me-1'></i>
          {detials.ratingsAverage}
        </span>
      </div>
      <button className='btn bg-main text-main-light w-100 btn-sm' onClick={()=>addItem(detials.id)}> Add to cart</button>
   
      </div>
    </div>
   </div>
   </> } 
   </div>
  
}
