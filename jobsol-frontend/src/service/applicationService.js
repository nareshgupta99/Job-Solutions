import { PrivateAxios } from "./axiosConfig"

const applyJob=(jobId)=>{
   return PrivateAxios.post(`/job/apply/${jobId}`)
}

export {applyJob}