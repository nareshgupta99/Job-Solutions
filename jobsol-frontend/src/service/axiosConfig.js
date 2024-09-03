  import axios from 'axios';
  import { getToken } from './authService';
  import { Navigate, useNavigate } from 'react-router';
import logout from '../component/logout/logout';

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
      if(token){
          config.headers.Authorization=`Bearer ${token}`
          return config;
      }
  },err=>Promise.reject(err))
    
  export {PrivateAxios,PublicAxios}

    PrivateAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("token","");
          window.location.replace('/login'); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );