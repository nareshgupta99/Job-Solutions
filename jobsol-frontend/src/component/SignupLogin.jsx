import { useState } from 'react';
import './signup.css';

import { Navigate } from 'react-router-dom';


const SignupLogin = () => {

  
  let [active,setActive]=useState(false);  
  const activeFormHandler=(event)=>{
  setActive(!active);
 }

 const [signupData,setSignupData]=useState({
  fullName:"",
  username:"",
  password:"",
  confirmPassword:"",
  gender:""
})
const [loginData,SetLoginData]=useState({
  username:"",
  password:"",
})


const signupHandle=(event)=>{
  setSignupData({...signupData,[event.target.name]:event.target.value})
  console.log(signupData)
}

const loginHandler=(event)=>{
  let name=event.target.name;
  let value=event.target.value;
  if(name=="loginUsername") SetLoginData({...loginData,"username":value})
  if(name=="loginPassword") SetLoginData({...loginData,"password":value})
  console.log(loginData)
}


const handleSubmit=async (event)=>{
  event.preventDefault();
  console.log("in handle Submit")


}

const handleLogin=async (event)=>{
  event.preventDefault();
  console.log("in handle login");
}

  

  return (

    <div className={ active===true?"active container":"container"} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          {/* <div class="social-icons">
            <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
            <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
            <a href="#" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
          </div> */}
          <span>or use your email for registeration</span>
          <input type="text" placeholder="Name" value={signupData.fullName} onChange={signupHandle} name="fullName"/>
          <input type="email" placeholder="Email" value={signupData.username} onChange={signupHandle} name="username"/>
          <input type="password" placeholder="Password" value={signupData.password} onChange={signupHandle} name='password'/>
          <input type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={signupHandle} name='confirmPassword'/>
          <div style={{display:"flex", alignItems:"center" ,justifyItems:'center'}}>
          Male:
          <input type='radio' name='gender' value={"male"} onChange={signupHandle}/>
          Female:
          <input type='radio' name='gender' value={"female"} onChange={signupHandle}/>
          </div>
          
          <button onClick={handleSubmit} >Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>Name
          <span>or use your email password</span>
          <input type="email" placeholder="Email" name='loginUsername' value={loginData.username} onChange={loginHandler}/>
          <input type="password" placeholder="Password" name='loginPassword'value={loginData.signup} onChange={loginHandler}/>
          <a href="#">Forget Your Password?</a>
          <button onClick={handleLogin}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={activeFormHandler}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register" onClick={activeFormHandler} >Sign Up</button>
          </div>
        </div>
      </div>
    </div>



  )

}

export default SignupLogin;