import { PrivateAxios } from "./axiosConfig"

const getEmployeerProfile=async()=>{
   return await PrivateAxios.get("/employeer/profile");
}

const updateEmployeerProfile=async()=>{
    return await PrivateAxios.post("");
}


export {getEmployeerProfile,updateEmployeerProfile};