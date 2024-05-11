

import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

function SeekerRoutes() {

  const {auth}=useContext(AuthContext);

 const {user}=auth
 const roles=user?.roles
 console.log(user)

 console.log("seeker routes")
 

 function checkRoleSeeker(){
  let isSeeker=false;
  for(let i=0;i<roles?.length;i++){
    if(roles[i].roleName=='ROLE_SEEKER') isSeeker=true
  }
  return isSeeker;
 }
 const navigate = useNavigate()

 

 useEffect(() => {
   if (!(auth?.user && auth.isLoogedIn)) {
     navigate("/");
   }
// checkeing rolewhether it is employeer or not
   if(!checkRoleSeeker()){
    console.log("you are not a seeker")
      // toast.warn("you a")
      navigate("/")
   }
 },[]);

  return (
    <Outlet />
  )
}

export default SeekerRoutes;

