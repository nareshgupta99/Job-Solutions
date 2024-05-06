import { PrivateAxios } from "./axiosConfig"


const getUser= async ()=>{
    PrivateAxios.get("")
}


const updateProfilePic=async (file)=>{
    console.log(file,"image file")
    const formData = new FormData();
    formData.append('file', file);
    const response = await PrivateAxios.patch('/seeker/profile/pic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response,"response")
    // return response;
}


export {updateProfilePic}