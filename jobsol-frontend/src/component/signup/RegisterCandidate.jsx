import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { registerUser } from '../../service/authService';
import {  toast } from 'react-toastify';

function RegisterCandidate({role}) {
  
  
  const {setToken}=useContext(AuthContext);

  const navigate=useNavigate();

  const [data,setData]=useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    roleName:role
  })

  const changeHandler =(event)=>{
    event.preventDefault();
    setData({...data,[event.target.name]:event.target.value})
    console.log(data)
  }
  
  const handleSubmit=async(event)=>{
    event.preventDefault();
    try{
     const {token}= await registerUser(data);
     setToken(token);
     console.log(token);
      toast.success("Registerd successfully");
     navigate("/home");
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="col-lg-4 border p-3 m-auto">
      <form className="form-contact contact_form" >
        <div className="row">
          <div className="col-sm-12 col-sm-7">
            <div className="form-group">
              <input className="form-control valid" name="name" id="name" type="text"   placeholder="Denis "  onChange={changeHandler} value={data.name} />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <input className="form-control valid" name="email" id="email" type="email"   placeholder="denis@example.com" onChange={changeHandler} value={data.email} />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <input className="form-control" name="password" id="password" type="password"   placeholder="Enter Password"  onChange={changeHandler} value={data.password}/>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <input className="form-control" name="confirmPassword" id="confirmPassword" type="password"   placeholder="Enter Confirm Password"  onChange={changeHandler} value={data.confirmPassword}/>
            </div>
          </div>
        </div>
        <div className="form-group mt-3">
          
          <button type="submit" className="button button-contactForm boxed-btn w-100" onClick={handleSubmit}>Register</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterCandidate