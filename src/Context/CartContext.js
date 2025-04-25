import axios from "axios";
import { createContext } from "react";
export let cartContext = createContext()
export default function CartContextProvider(props){
    let headers = {
        token: localStorage.getItem('userToken')
    }
  async function addToCart(productId){
 return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
    productId
 },{
    headers
 } )
  .catch((err) =>err);
  }
  async function getCartItem(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
       headers
    } )
     .catch((err) =>err);
     }
     async function deleteCartItem(productId){
      return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
         headers
      } )
       .catch((err) =>err);
       }

       async function updateCartItem(productId ,count){
         return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count
         } , {
            headers
         } )
          .catch((err) =>err);
          }
  return <cartContext.Provider value={{addToCart , getCartItem , deleteCartItem , updateCartItem}}>
    {props.children}
  </cartContext.Provider>
}