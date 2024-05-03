import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { getUserFromToken } from '../service/authService';

function AuthContextProvider({ children }) {
  const token = localStorage.getItem('token');
  const initialUser = token ? getUserFromToken(token) : null;
  const initialIsLoggedIn = !!token && !!initialUser;
  console.log(initialUser)

  const [auth,setAuth]=useState({
    user:initialUser,
    isLoogedIn:initialIsLoggedIn
  })

  return (
    <AuthContext.Provider value={{ auth,setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;