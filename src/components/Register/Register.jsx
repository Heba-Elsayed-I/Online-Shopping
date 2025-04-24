import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import  axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function Register() {
  const [loading , setLoading]  =  useState(false);
  const [apiError , setapiError] = useState(null);
  let navigate = useNavigate()
  let validationSchema =yup.object({
    name:yup.string().required('Name is required ').min(3 ,'minmum length is 3 ').max(15 ,'maximum length is 10'),
    email:yup.string().required('email is required').email('email is invalid'),
    password:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}/,'password start with capital charachter '),
    rePassword:yup.string().required('rePassword is required').oneOf([yup.ref('password')], 'password and rePassword dont match'),
    phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'Enter egyption number phone ')
  })
  async function registerSubmit(values) {
     setLoading(true);
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values) 
    .catch((err)=>{setapiError(err.response.data.message);
      setLoading(false)
    })
    if(data.message == 'success'){
      setLoading(false)
      navigate('/Online-Shopping/login')
    }
    console.log(data);
    
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },validationSchema,
    onSubmit :registerSubmit,
  });
  return (
    <>
      <div className="w-75 mx-auto  py-4">
        <h2 className="text-center">Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError? <div className="alert alert-danger">{apiError}</div> : ''}
          
          <label htmlFor="name">Name : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            name="name"
            className="form-control mb-3"
          ></input>
          {formik.errors.name && formik.touched.name ?<div className="alert alert-danger">{formik.errors.name}</div>:''} 
          <label htmlFor="email">Email : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
          ></input>
          {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>:''} 
          <label htmlFor="password">Password : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
          ></input>
          {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>:''} 
          <label htmlFor="rePassword">RePassword : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="form-control mb-3"
          ></input>
            {formik.errors.rePassword && formik.touched.rePassword ?<div className="alert alert-danger">{formik.errors.rePassword}</div>:''} 
        
          <label htmlFor="phone">Phone : </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className="form-control mb-3"
          ></input>
         {formik.errors.phone && formik.touched.phone ?<div className="alert alert-danger">{formik.errors.phone}</div>:''} 
          {loading ? <button disabled={!(formik.isValid && formik.dirty)}   className="btn bg-main text-light px-4" type="button">
          <PulseLoader
  color="#ffffff"
  loading={true}
  size={10}
/>
          </button> : 
          <button disabled={!(formik.isValid && formik.dirty)}   className="btn bg-main text-light px-4" type="submit">
          Register
        </button> }
        <span className="ps-3">If you have an account ?</span>
          <Link className="ps-3" to={'/Online-Shopping/login'}>Login Now</Link>
         
        </form>
      </div>
    </>
  );
}
