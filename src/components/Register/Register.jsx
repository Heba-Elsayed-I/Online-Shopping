import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import  axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Register() {
  const [loading , setLoading]  =  useState(false);
  let validationSchema =yup.object({
    name:yup.string().required('Name is required ').min(3 ,'minmum length is 3 ').max(10 ,'maximum length is 10'),
    email:yup.string().required('email is required').email('email is invalid'),
    password:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}/,'password start with capital charachter '),
    rePassword:yup.string().required('rePassword is required').oneOf([yup.ref('password')], 'password and rePassword dont match'),
    phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'Enter egyption number phone ')
  })
  async function registerSubmit(values) {
     setLoading(true);
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values) 
    .catch((err)=>{console.log(err.response.data.message);
    })
    if(data.message == 'success'){
      setLoading(false)
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
            <i className="fas fa-spinner fa-spin"></i>
          </button> : 
          <button disabled={!(formik.isValid && formik.dirty)}   className="btn bg-main text-light px-4" type="submit">
          Register
        </button> }
          
         
        </form>
      </div>
    </>
  );
}
