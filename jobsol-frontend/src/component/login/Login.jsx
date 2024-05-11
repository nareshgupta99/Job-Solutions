import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { getLoginUser, getUserFromToken, loginUser   } from '../../service/authService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';


function Login() {

  const {auth,setAuth}=useContext(AuthContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const changeHandler = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value })
    console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res  = await loginUser(data);
      const {token}=res.data
      const {success}=res.data
      const {message}=res.data
      console.log(token,success,message)    
       
      if(success==true){
        toast.success(message)
        localStorage.setItem("token",token)
        // geeting user and roles from token
       const user= getUserFromToken(token);
       setAuth({...auth,user:user,isLoogedIn:true})
       
        navigate("/home");
      } else{
        toast.error(message)
      }
    } catch (err) {
      if(err.response){
        const {message,success}=err.response.data
        toast.error(message)
      }else{
        toast.error(err.message)
      }
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
          <div className="col-12">
            <div className="form-group">
              <input className="form-control" name="password" id="password" type="password" placeholder="Enter Password" onChange={changeHandler} value={data.password} />
            </div>
          </div>

        </div>
        <div className="form-group mt-3">

          <button type="submit" className="button button-contactForm boxed-btn w-100" onClick={handleSubmit}>Login</button>
        </div>
        <Link to={"/auth/user/forgot"} style={{color:"black"}}>Forgot Password</Link>
      </form>
    </div>
  )
}

export default Login