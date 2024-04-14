import { Link } from 'react-router-dom';
import '../forgot/forgot.css';  
import { useState } from 'react';
import { forgotPassword } from '../../service/authService';
const ForgotPassword = () => {
  const [email,setEmail]=useState("");

  const handleChange=(e)=>{
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("forgot")
    try{
      const res=await forgotPassword({email:email});
      console.log(res);

    }catch(err){
      console.log(err)
    }
  }



  return (
    <div>
      <div className="wrapper">
        <h1>Forgot Password</h1>
        <div className="inputs" style={{marginTop:"10px"}}>
          <div className="field">
            <input type="email" placeholder="Find your Email or Phone" name="email" onChange={handleChange} value={email}/>
          </div>
          <button type="submit" onClick={handleSubmit}>Send</button>
        </div>
        <div className="link1">
          <p>
            Back To <Link to="/candidate/signup" >Signin.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
