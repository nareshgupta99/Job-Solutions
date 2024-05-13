import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { passwordChange } from '../../service/authService';


function ChangePassword() {

    const [showPassword,setShowPassword]=useState(false)
    const passwordStyle={
        position:"relative" ,right:"2em",top:'1em'
    }

    const togglePassword=()=>{
        setShowPassword(!showPassword)
    }
  const [data, setData] = useState({
   NewPassword: "",
   ConfirmPassword:"",
    OldPassword: "",
  })

  const changeHandler = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value })
   console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     const res= await passwordChange(data);
      const {success}=res.data
      const {message}=res.data
    console.log(res)   
       
      if(success==true){
        toast.success(message)
       
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
            <div className="form-group d-flex">
              <input className="form-control valid" name="NewPassword" id="email" type={showPassword ?"text":"password"} placeholder="New Password" onChange={changeHandler} value={data.email} />
              {showPassword?

        <AiOutlineEyeInvisible onClick={togglePassword} style={passwordStyle}/>
                  :<AiOutlineEye onClick={togglePassword}  style={passwordStyle}/>
              }
            </div>
          </div>
          <div className="col-12">
            <div className="form-group d-flex">
              <input className="form-control " name="ConfirmPassword" id="password"  type={showPassword ?"text":"password"} placeholder="Retype Password" onChange={changeHandler} value={data.password} />
              {showPassword?

<AiOutlineEyeInvisible onClick={togglePassword} style={passwordStyle}/>
          :<AiOutlineEye onClick={togglePassword}  style={passwordStyle}/>
      }
            </div>
            <div className="form-group d-flex">
              <input className="form-control" name="OldPassword" id="password"  type={showPassword ?"text":"password"} placeholder="Old Password" onChange={changeHandler} value={data.password} />
              {showPassword?

<AiOutlineEyeInvisible onClick={togglePassword} style={passwordStyle}/>
          :<AiOutlineEye onClick={togglePassword}  style={passwordStyle}/>
      }
            </div>
          </div>

        </div>
        <div className="form-group mt-3">

          <button type="submit" className="button button-contactForm boxed-btn w-100" onClick={handleSubmit}>Change Password</button>
        </div>
        
      </form>
    </div>
  )
}

export default ChangePassword