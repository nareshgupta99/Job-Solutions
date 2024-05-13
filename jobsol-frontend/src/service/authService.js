import { useContext } from 'react';
import { PrivateAxios, PublicAxios } from './axiosConfig';
import AuthContext from '../context/AuthContext';


const registerUser=async (user)=>{
    const data = await PublicAxios.post("auth/user/signup", user, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log(data)
    return data;
}

const loginUser = async (candidate) => {
    const data = await PublicAxios.post("/auth/user/login", candidate, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    return data;

}


const getToken=()=>{
    return localStorage.getItem("token");
}

const forgotPassword=async (email)=>{
    const data = await PublicAxios.post("/auth/user/forgot-password",email)
    return data;
}

const resetPassword=async(data,resetToken)=>{
    const res=await PublicAxios.patch(`/auth/user/reset-password/${resetToken}`,data);
    return res;
}

const employeerSignup=async (data)=>{
   const res=await PublicAxios.post("/auth/employer/signup",data);
   return res;
}


const getLoginUser= async()=>{
   return await PrivateAxios.get("/auth/user");
}

function getUserFromToken(token) {
    if (!token || token==='undefined') return null;

    let decodedToken;
    try {
         decodedToken = JSON.parse(atob(token.split(".")[1])); // decode jwt token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    console.log("token",token)
    return {
        email:decodedToken.email,
        is_enabled:decodedToken.is_enabled,
        roles:decodedToken.roles
    }
  }

 
const passwordChange=async(data)=>{
return PrivateAxios.post("/auth/change/password",data)
}
  




export {  loginUser ,getToken,forgotPassword,passwordChange,resetPassword,employeerSignup,registerUser,getLoginUser,getUserFromToken}
