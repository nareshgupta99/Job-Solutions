import { PrivateAxios } from "./axiosConfig"


const getSeekerProfile = async () => {
  return await PrivateAxios.get("/seeker/profile");
}


const updateProfilePic = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await PrivateAxios.patch('/seeker/profile/pic', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  console.log(response, "response")
  // return response;
}


const deleteProfilePic = async () => {
  const response = await PrivateAxios.delete('/seeker/profile/pic');
  return response;
}

const resumeUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await PrivateAxios.patch('/seeker/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const deleteResume=async()=>{
  const response = await PrivateAxios.delete('/seeker/resume');
  return response;
}

const getUserDetails=async()=>{
  const response=await PrivateAxios.get("/user")
  return response;
}

const updateProfile=async (profile)=>{
  const response=await PrivateAxios.post('/seeker/profile',profile)
  return response;
}

export { updateProfilePic, deleteProfilePic, getSeekerProfile,resumeUpload,deleteResume,getUserDetails,updateProfile }