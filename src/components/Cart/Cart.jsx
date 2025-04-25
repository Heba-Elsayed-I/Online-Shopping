import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import {  cartContext } from '../../Context/CartContext'
import { PulseLoader } from "react-spinners";
export default function Cart() {
  let  {updateCartItem, getCartItem , deleteCartItem} = useContext(cartContext)
   const [cartItems, setCartItems] = useState(null)
   const [loading, setloading] = useState(true)
  async function getItems(){
   let {data} = await getCartItem()
   console.log(data)
   setCartItems(data)
   setloading(false)
  }
  async function deleteItems(id){
    setloading(true)
   let {data} =  await deleteCartItem(id)
     setCartItems(data)
     setloading(false)
    
   }
   async function updateItems(id , count){
    if(count <1){
      setloading(true)
      let {data} =  await deleteCartItem(id)
      setCartItems(data)
      setloading(false)
    }
    else{
      setloading(true)
   let {data} =  await updateCartItem(id , count)
   setCartItems(data)
   setloading(false)
    }  
   }
  useEffect(()=>{
getItems()
  } ,[])
  return<>
 <div className="bg-main-light p-4 m-5">
  <h2 className='fw-bold'>Cart</h2>
 {loading ? 
  <div className="loading">
            <PulseLoader 
  color= "#008000"
  loading={true}
  size={50}
/>
  
 </div>
 :<>
 <p className='text-main'> Num of cart items :{cartItems.numOfCartItems}</p>
 <p className='text-main'> Total cart price :{cartItems.data.totalCartPrice} EGP</p>
   {cartItems.data.products.map(product=> <div key={product.product.id} className="row align-items-center m-0 p-2 border-bottom">
    <div className="col-md-1">
      <div className="img">
      <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
      </div>
    </div>
    <div className="col-md-10">
      <div className="item">
        <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
        <p className='text-main fw-bold'>Price : {product.price} EGP</p>
        <button className='btn' onClick={()=>deleteItems(product.product.id)}><i className="fa-solid fa-trash text-danger"></i> Remove</button>
      </div>
    </div>
    <div className="col-md-1">
      <div className="count">
        <button className='btn bdr mx-2' onClick={()=>updateItems(product.product.id , product.count +1)}> + </button>
        <span className=''>{product.count}</span>
        <button className='btn bdr mx-2' onClick={()=>updateItems(product.product.id , product.count - 1)}> - </button>
      </div>
    </div>
   </div>)}
 </>}
 </div> 
 </>
}
