import React, { useContext, useEffect, useState } from 'react'
import style from './FeaturedProducts.module.css'
import axios from 'axios'
import { PulseLoader } from "react-spinners";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function FeaturedProducts() {
  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {data, isError , isLoading , isFetched} = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getProducts,  
  })

 let{addToCart} =useContext(cartContext)
async function postToCart(id){
 let {data} = await addToCart(id)
 if(data.status == 'success'){
  toast.success(data.message ,{
    icon: '👏',
  })
 }
 
}


  return <>
  {isLoading? 
   <div className="d-flex justify-content-center mt-5 ">
          <PulseLoader 
  color= "#008000"
  loading={true}
  size={50}
/>
   </div>  
 :  <div className="row p-5 gy-4">
   {data?.data.data.map(product  => 
   <div className="col-lg-2" key={product.id}>
   
    <div className="product text-center p-2">
      <Link to= {`/Online-Shopping/productdetails/${product.id}`}>
      <img src={product.imageCover} className='w-100' alt={product.title} />
      <span className='font-sm text-main'>{product.category.name}</span>
      <h3 className='h5'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
      <div className="d-flex py-3 justify-content-between align-items-center">
        <span className='font-sm'>{product.price} EGP</span>
        <span className='font-sm'>
          <i className='fas fa-star rating-color me-1'></i>
          {product.ratingsAverage}
        </span>
      </div>
      </Link>
      <button onClick={()=>postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm'> Add to cart</button>
    </div>
    
  </div>
 
   )}
 </div> }
  </>
}


 