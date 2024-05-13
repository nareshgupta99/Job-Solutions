import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { getUserFromToken } from '../service/authService';
import { getUserDetails } from '../service/userService';
import { getAllApllicationByJobSeeker } from '../service/applicationService';

function AuthContextProvider({ children }) {
  const token = localStorage.getItem('token');
  let initialUser;
  if (token) {
    initialUser = getUserFromToken(token)
  }
  let initialUserDetails = token ? getUserDetails() : null
  const initialIsLoggedIn = !!token && !!initialUser;
  let allApplications=token ?getAllApllicationByJobSeeker():[]

  const [auth, setAuth] = useState({
    user: initialUser,
    isLoogedIn: initialIsLoggedIn,
    userDetails: initialUserDetails,
    Applications:allApplications
  })

  console.log(auth)


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;