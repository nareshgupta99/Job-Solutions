import { useState } from "react";
import "../reset/reset.css";
import { useParams } from "react-router";
import { resetCandidatePassword } from "../../service/authService";

const ResetPage = (props) => {
  const [data,setData]=useState({
    password:"",
    confirmPassword:""
  })

  const {resetToken}= useParams("resetToken");

  const handleChange=(e)=>{
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    try{
      const res=await resetCandidatePassword(data,resetToken);
      console.log(res);
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div>
      <form>
        <div class="wrapper">
          <h1>Reset Password</h1>
          <br />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="password" onChange={handleChange} name="password" />
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confrm=password"
            placeholder="confirm password "
            name="confirmPassword"
            onChange={handleChange}
          />
          <p id="error"></p>
          <br />

          <input type="button" id="button" value="SUBMIT" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  );
};
export default ResetPage;
