import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getLoginUser, getUserFromToken, loginUser, resetPassword   } from '../../service/authService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';


function ResetPage({ role }) {

  const {auth,setAuth}=useContext(AuthContext);
  const {resetToken}= useParams("resetToken");


  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  })

  const changeHandler = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value })
    console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res  = await resetPassword(data,resetToken);
      const {token}=res.data
      const {success}=res.data
      const {message}=res.data
      console.log(token,success,message)    
       
      if(success==true){
        toast.success(message)
        
        navigate("/home");
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
              <input className="form-control valid" name="password" id="password" type="password" placeholder="Enter Password" onChange={changeHandler} value={data.password} />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <input className="form-control" name="confirmPassword" id="password" type="password" placeholder="Enter Password" onChange={changeHandler} value={data.confirmPassword} />
            </div>
          </div>

        </div>
        <div className="form-group mt-3">

          <button type="submit" className="button button-contactForm boxed-btn w-100" onClick={handleSubmit}>Update Password</button>
        </div>
  
      </form>
    </div>
  )
}

export default ResetPage;