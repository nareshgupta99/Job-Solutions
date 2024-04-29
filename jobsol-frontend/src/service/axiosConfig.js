import axios from 'axios';
import { getToken } from './authService';
import { Navigate, useNavigate } from 'react-router';

const BASE_URL="http://localhost:4000/api/";


const PrivateAxios = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {"Content-Type": "application/json"}
  });

  const PublicAxios = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {"Content-Type": "application/json"}
  });


  PrivateAxios.interceptors.request.use(config=>{
    const token=getToken();
    console.log(token)
    if(token){
        config.headers.Authorization=`Bearer ${token}`
        return config;
    }
 },err=>Promise.reject(err))
  export {PrivateAxios,PublicAxios}