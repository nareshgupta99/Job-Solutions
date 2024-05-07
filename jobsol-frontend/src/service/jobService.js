import { PrivateAxios, PublicAxios } from "./axiosConfig";

async function getAllJobs (page){
    const response = await PublicAxios.get(`/job?page=${page}`);
    return response;
}

async function createJob(data){
    return await PrivateAxios.post("/employeer/job/create",data);
}

async function getJobById(id){
return await PublicAxios.get(`/job/${id}`);
}

async function getJobsByEmployeer(){
    const res= await PrivateAxios.get("/jobs/employer");
    return res;
}


async function deleteJobById(jobId){
    return await PrivateAxios.delete(`/job/${jobId}`)
}
export {getAllJobs,createJob,getJobById,getJobsByEmployeer,deleteJobById};

