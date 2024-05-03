import React from "react";

import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

function SeekerRoutes() {

  const {auth}=useContext(AuthContext);

 const {user}=auth
 const roles=user?.roles
 

 function checkRoleSeeker(){
  isSeeker=false;
  for(let i=0;i<roles?.length;i++){
    if(roles[i].roleName=='ROLE_SEEKER') isSeeker=true
  }
  return isSeeker;
 }
 const navigate = useNavigate()

 useEffect(() => {
   if (auth?.user && auth.isLoogedIn) {
     navigate("/");
   }
// checkeing rolewhether it is employeer or not
   if(!checkRoleSeeker()){
      // toast.warn("you a")
      navigate("/")
   }
 },[]);

  return (
    <Outlet />
  )
}

export default SeekerRoutes;

