import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { getUserFromToken } from '../service/authService';
import { getUserDetails } from '../service/userService';

function AuthContextProvider({ children }) {
  const token = localStorage.getItem('token');
  const initialUser = token ? getUserFromToken(token) : null;
  let initialUserDetails =null;
  if(token) getUserDetails().then((res)=>{initialUserDetails=res;console.log(res)}).catch((err)=>initialUserDetails=null)
  const initialIsLoggedIn = !!token && !!initialUser;

  const [auth,setAuth]=useState({
    user:initialUser,
    isLoogedIn:initialIsLoggedIn,
    userDetails:initialUserDetails
  })

  return (
    <AuthContext.Provider value={{ auth,setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;