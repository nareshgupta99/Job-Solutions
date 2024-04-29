import { PrivateAxios } from "./axiosConfig"

const getEmployeerProfile=async()=>{
   return await PrivateAxios.get("/employeer/profile");
}


export {getEmployeerProfile};