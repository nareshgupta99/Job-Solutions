import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import {  getUserFromToken,  forgotPassword  } from '../../service/authService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';


function Login({ role }) {



  const [data, setData] = useState({
    email: "",
  })

  const changeHandler = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value })
    console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res  = await forgotPassword(data);
      const {token}=res.data
      const {success}=res.data
      const {message}=res.data
      console.log(token,success,message) 
      if(success==true){
        toast.success(message)
      } else{
        toast.error(message)
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  return (
    <div className="col-lg-4 border p-3 m-auto">
      <form className="form-contact contact_form" >
        <div className="row">
         
          <div className="col-sm-12">
            <div className="form-group">
              <input className="form-control valid" name="email" id="email" type="email" placeholder="denis@example.com" onChange={changeHandler} value={data.email} />
            </div>
          </div>
          
        </div>
        <div className="form-group mt-3">

          <button type="submit" className="button button-contactForm boxed-btn w-100" onClick={handleSubmit}>Send Email</button>
        </div>
       
      </form>
    </div>
  )
}

export default Login