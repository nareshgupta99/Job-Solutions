import { PublicAxios } from './axiosConfig';




const registerUser=async (user)=>{
    const data = await PublicAxios.post("auth/user/signup", user, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log(data)
    return data;
}

const candidateLogin = async (candidate) => {
    const data = await PublicAxios.post("auth/candidate/login", candidate, {
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
    const data = await PublicAxios.post("auth/candidate/forgot-password",email)
    return data;
}

const resetCandidatePassword=async(data,resetToken)=>{
    const res=await PublicAxios.patch(`/auth/candidate/reset-password/${resetToken}`,data);
    return res;
}

const employeerSignup=async (data)=>{
   const res=await PublicAxios.post("/auth/employer/signup",data);
   return res;
}



export {  candidateLogin ,getToken,forgotPassword,resetCandidatePassword,employeerSignup,registerUser}
