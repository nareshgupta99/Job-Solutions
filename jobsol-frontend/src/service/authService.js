import { PublicAxios } from './axiosConfig';


const candidateSignup = async (candidate) => {
    console.log("candidate signup")
    const data = await PublicAxios.post("auth/candidate/signup", candidate, {
        headers: {
            "Content-Type": "application/json",
        }
    })
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

// function isUserLoggedIn() {
//     const token=getToken();
//     if(token) return true
//     else false;
// }
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


export { candidateSignup, candidateLogin ,getToken,forgotPassword,resetCandidatePassword,employeerSignup}
