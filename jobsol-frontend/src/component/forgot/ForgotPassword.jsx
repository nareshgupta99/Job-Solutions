import { Link } from 'react-router-dom';
// import '../forgot/forgot.css';  
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

  const wrapper={
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6ddecd",
    borderRadius: "0.8rem"
  }

  const input={
    width:" 250px",
    height: "30px",
    outline: "none",
    border: "none",
    borderRadius: "0.3rem",
    paddingLeft: "35px",
  }

  return (
    <div>
      <div className="wrapper" style={wrapper}>
        <h1 style={{fontSize: "30px"}}>Forgot Password</h1>
        <div className="inputs" style={{marginTop:"10px"}}>
          <div className="field">
            <input type="email" placeholder="Find your Email or Phone" name="email" onChange={handleChange} value={email} style={input}/>
          <button type="submit" onClick={handleSubmit}>Send</button>
          </div>
        </div>
        <div className="link1">
          <p style={{margin:"34px 0"}}>
            Back To <Link to="/candidate/signup" >Signin.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
