import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { getUserFromToken } from '../service/authService';
import { getUserDetails } from '../service/userService';

function AuthContextProvider({ children }) {
  const token = localStorage.getItem('token');
  const initialUser = token ? getUserFromToken(token) : null;
  const initialUserDetails =token ? getUserDetails() : null;
  const initialIsLoggedIn = !!token && !!initialUser;
  console.log(initialUserDetails,"auth context provider")

  const [auth,setAuth]=useState({
    user:initialUser,
    isLoogedIn:initialIsLoggedIn,
    userDetails:initialUserDetails
  })

  // console.log(initialUserDetails)
  return (
    <AuthContext.Provider value={{ auth,setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;