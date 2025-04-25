import style from './Login.module.css'
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import  axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const [loading , setLoading]  =  useState(false);
  const [apiError , setapiError] = useState(null);
  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate()
  let validationSchema =yup.object({
   email:yup.string().required('email is required').email('email is invalid'),
    password:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}/,'password start with capital charachter '),
  })
  async function loginSubmit(values) {
     setLoading(true);
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values) 
    .catch((err)=>{setapiError(err.response.data.message);
      setLoading(false)
    })
    if(data.message == 'success'){
      setLoading(false)
      localStorage.setItem('userToken' , data.token)
      setUserToken(data.token)
      navigate('/Online-Shopping')
    }
    console.log(data);
    
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",  
    },validationSchema,
    onSubmit :loginSubmit,
  });
  return (
    <>
      <div className="w-75 mx-auto  py-4">
        <h2 className="text-center fw-bold">Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError? <div className="alert alert-danger">{apiError}</div> : ''}
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
        <span className="ps-3">If you don't have an account ?</span>
        <Link className="ps-3" to={'/Online-Shopping/register'}>Register Now</Link>
        </form>
      </div>
    </>
  );
}
