import React from 'react'
import style from './MainSlider.module.css' 
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import Slider from "react-slick";
import img1 from '../../Assets/images/85372696.webp'
import img2 from '../../Assets/images/GUEST_d240e546-15eb-49c1-97ba-58a8a038b661.webp'
export default function MainSlider() {
  var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplaySpeed:1000
  };
  return <>
  <div className="row m-5 gx-0 ">
    <div className="col-md-9">
    <Slider {...settings}>
      <img src={slide1} height={550} className='w-100' alt="slider1" />
      <img src={slide2}  height={550}  className='w-100' alt="slider2" />
      <img src={slide3} height={550}  className='w-100' alt="slider3" />
    </Slider>
    </div>
    <div className="col-md-3 ">
      <div className="images">
      <img src={img1} alt="img1" height={275} className='w-100 rounded-0'/>
      <img src={img2} alt="img2" height={275} className='w-100 rounded-0'/>
      </div>
    </div>
  </div>
  </>
}
