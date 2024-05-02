import { PublicAxios } from "./axiosConfig";

async function getAllJobs (page){
    const response = await PublicAxios.get(`/job?page=${page}`);
    return response;
}

export {getAllJobs};

