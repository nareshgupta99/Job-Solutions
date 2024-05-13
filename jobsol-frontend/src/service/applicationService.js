import { PrivateAxios } from "./axiosConfig"

const applyJob=(jobId)=>{
   return PrivateAxios.post(`/job/apply/${jobId}`)
}

const getAllApllicationByJob=async(jobId)=>{
   return await PrivateAxios.get(`/job/apply/employeer/${jobId}`)
}

const updateStatusByApplicationId=async(id,data)=>{
   return await PrivateAxios.patch(`/job/apply/${id}`,data);

}

const getAllApllicationByJobSeeker=async()=>{
   return await PrivateAxios.get("/job/apply/seeker");
}

export {applyJob,getAllApllicationByJob,updateStatusByApplicationId,getAllApllicationByJobSeeker}