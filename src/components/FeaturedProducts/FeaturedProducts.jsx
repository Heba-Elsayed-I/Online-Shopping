import React, { useEffect, useState } from 'react'
import style from './FeaturedProducts.module.css'
import axios from 'axios'
import { PulseLoader } from "react-spinners";
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  async function getProducts(){
   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
   setProducts(data.data)
   setLoading(false)  
  }
  useEffect(()=>{
     getProducts() 
  } , [])
  return <>
  {loading? 
   <div className="d-flex justify-content-center mt-5 ">
          <PulseLoader 
  color= "#008000"
  loading={true}
  size={50}
/>
   </div>  
 :  <div className="row p-5 gy-4">
   {products.map(product  => 
   <div className="col-lg-2" key={product.id}>
   <Link to= {`/Online-Shopping/productdetails/${product.id}`}>
    <div className="product text-center p-2">
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
      <button className='btn bg-main text-main-light w-100 btn-sm'> Add to cart</button>
    </div>
    </Link>
  </div>
 
   )}
 </div> }
  </>
}


 