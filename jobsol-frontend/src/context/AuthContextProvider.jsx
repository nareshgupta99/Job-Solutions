import React, { useState } from 'react'
import AuthContext from './AuthContext'

 function AuthContextProvider({children}) {

    const setToken=(token)=>{
       return localStorage.setItem("token",token);
    }
    const [user,setUser]=useState(null);

  return (
    <AuthContext.Provider value={{setToken,user,setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;