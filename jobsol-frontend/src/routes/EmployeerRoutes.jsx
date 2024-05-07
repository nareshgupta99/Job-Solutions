import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import Sidebar from '../component/employeerDashboard/Sidebar';

function EmployeerRoutes() {

  const { auth } = useContext(AuthContext);


  const { user } = auth
  const roles = user?.roles


  function checkRoleEmployeer() {
    let isEmployeer = false;
    for (let i = 0; i < roles?.length; i++) {
      if (roles[i].roleName == 'ROLE_EMPLOYEER') isEmployeer = true
    }
    return isEmployeer;
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (!(auth?.user && auth.isLoogedIn)) {
      navigate("/");
    }
    // checkeing rolewhether it is employeer or not
    if (!checkRoleEmployeer()) {
      navigate("/")
    }
  }, []);

  return (
    <>
      <Sidebar >
      <Outlet />
      </Sidebar>

    </>
  )
}

export default EmployeerRoutes;