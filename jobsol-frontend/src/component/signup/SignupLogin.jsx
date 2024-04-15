import { useContext, useState } from 'react';
// import './signup.css';
import { candidateLogin, candidateSignup } from "../../service/authService";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthContext';


const SignupLogin = (props) => {
  const navigate = useNavigate();

  const {setToken}=useContext(AuthContext);

  let [active, setActive] = useState(false);
  const activeFormHandler = (event) => {
    setActive(!active);
  }

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })
  const [loginData, SetLoginData] = useState({
    email: "",
    password: "",
  })


  const signupHandle = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value })
    
  }

  const loginHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "loginUsername") SetLoginData({ ...loginData, "email": value })
    if (name === "loginPassword") SetLoginData({ ...loginData, "password": value })
   
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data}=await candidateSignup(signupData);
      setToken(data.token);
      navigate("/")

    } catch (err) {
      console.log(err)
    }


  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const {data} = await candidateLogin(loginData);
      console.log(data);
      setToken(data.token);
      navigate("/")

    } catch (err) {
      const { response } = err
      console.log(response);
    }
  }



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
      <div className={active === true ? "active container" : "container"} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" value={signupData.name} onChange={signupHandle} name="name" />
            <input type="email" placeholder="Email" value={signupData.email} onChange={signupHandle} name="email" />
            <input type="password" placeholder="Password" value={signupData.password} onChange={signupHandle} name='password' />
            <input type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={signupHandle} name='confirmPassword' />
            <div style={{ display: "flex", alignItems: "center", justifyItems: 'center' }}>
              <span style={{color:'black'}}>Male:</span>
              <input type='radio' name='gender' value={"male"} onChange={signupHandle} />
              <span style={{color:'black',marginLeft:"10px"}}>Female:</span>
              <input type='radio' name='gender' value={"female"} onChange={signupHandle} />
            </div>

            <button onClick={handleSubmit} >Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" name='loginUsername' value={loginData.email} onChange={loginHandler} />
            <input type="password" placeholder="Password" name='loginPassword' value={loginData.signup} onChange={loginHandler} />
            <Link to="/candidate/forgot">Forget Your Password?</Link>
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
    </div>


  )

}

export default SignupLogin;