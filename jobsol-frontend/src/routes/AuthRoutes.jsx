import React, { useContext ,useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext'

const AuthRoutes = () => {


  const {auth}=useContext(AuthContext);

 const {user}=auth
//  const {roles}=user
//  console.log(roles[0].roleName)

  const navigate = useNavigate()

  useEffect(() => {
    if (auth?.user && auth.isLoogedIn) {
      navigate("/");
    }
  },[]);

  return (
    
    <Outlet />
  
  )
  
}

export default AuthRoutes