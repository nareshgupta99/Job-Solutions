import { PrivateAxios } from "./axiosConfig"

const getEmployeerProfile=async()=>{
   return await PrivateAxios.get("/employeer/profile");
}

const updateEmployeerProfile=async(employeerProfile)=>{
    return await PrivateAxios.post("/employeer/profile",employeerProfile);
}


export {getEmployeerProfile,updateEmployeerProfile};