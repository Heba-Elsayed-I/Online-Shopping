import React from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/images/freshcart-logo.svg'

export default function Navbar() {
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" href="#">
    <img src={Logo} alt='fresh cart'/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" href={'/'}>Home</Link>
        </li>  
        <li className="nav-item">
          <Link className="nav-link" href={'cart'}>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={'wishlist'}>Wish List</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" href={'products'}>Products</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" href={'catgories'}>Catgories</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" href={'brand'}>Brand</Link>
        </li>
      </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
          <i className='fab fa-facebook me-2'></i>
          <i className='fab fa-twitter me-2'></i>
          <i className='fab fa-instagram me-2'></i>
          <i className='fab fa-youtube me-2'></i>
        </li>  
        <li className="nav-item">
          <Link className="nav-link" href={'register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={'login'}>Login</Link>
        </li>
        
        <li className="nav-item">
          <span className="nav-link cursor-pointer">Logout</span>
        </li>
      </ul>    
    </div>
  </div>
</nav>
  </>
}
