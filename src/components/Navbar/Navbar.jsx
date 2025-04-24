import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'

export default function Navbar() {

let {userToken ,setUserToken} = useContext(UserContext)
let navigate = useNavigate()
function Logout(){
  localStorage.removeItem('userToken')
   setUserToken(null)
  navigate('/Online-Shopping/login')
}
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
  <div className="container-fluid mx-5 ">
    <Link className="navbar-brand " to="#">
    <img src={Logo} alt='fresh cart'/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {userToken != null ? <>
        <li className="nav-item px-2">
          <Link className="nav-link fw-bold" to={''}>Home</Link>
        </li>  
        <li className="nav-item px-2">
          <Link className="nav-link fw-bold" to={'cart'}>Cart</Link>
        </li>
        <li className="nav-item px-2">
          <Link className="nav-link fw-bold" to={'wishlist'}>Wish List</Link>
        </li>
        
        <li className="nav-item px-2">
          <Link className="nav-link fw-bold" to={'products'}>Products</Link>
        </li>
        
        <li className="nav-item px-2">
          <Link className="nav-link fw-bold" to={'categories'}>Categories</Link>
        </li>

        <li className="nav-item px-2">
          <Link className="nav-link fw-bold" to={'brands'}>Brands</Link>
        </li>
        </> : ""}
      </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
          <i className='fab fa-facebook me-3'></i>
          <i className='fab fa-twitter me-3'></i>
          <i className='fab fa-instagram me-3'></i>
          <i className='fab fa-youtube me-3'></i>
        </li>  
        
          {userToken !=null? <>
          <li className="nav-item">
          <span onClick={Logout} className="nav-link fw-bold cursor-pointer px-2">Logout</span>
        </li> 
        </> :<>
        <li className="nav-item">
          <Link className="nav-link px-2 fw-bold" to={'register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 fw-bold" to={'login'}>Login</Link>
        </li>
        </>}
      </ul>    
    </div>
  </div>
</nav>
  </>
}
