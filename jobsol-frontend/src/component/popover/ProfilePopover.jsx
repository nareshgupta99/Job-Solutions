import React, { useContext, useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';





function ProfilePopover({profile}) {

  const {auth}=useContext(AuthContext)
  const {user}=auth
  const {roles}=user
  console.log(roles)
  
  
  function employeerRole(){
    let flag=false
    for(let i=0;i<roles.length;i++){
      if(roles[i].roleName==='ROLE_EMPLOYEER') flag=true;
    }
 return flag;
  }
 
  const navigate=useNavigate();  
  return (
    <div >
 <div className="card" style={{width: "18rem"}}>
  <ul className="list-group list-group-flush" >
  <Link to="/seeker/profile" style={{textDecoration:"none"}} >  <li className="list-group-item ">
    {profile?.imageUrl?
    <img src={profile?.imageUrl} style={{width:"100px",height:"100px",borderRadius:"100%"}} /> 
    :<CgProfile style={{ width: '30%', height: "30%" ,color:"black"}} />
  }
    
    <p style={{fontSize:"20px"}}> {profile?.name }</p></li> </Link>
   <Link to="/seeker/status" style={{textDecoration:"none"}} > <li className="list-group-item" style={{color:"black"}}>Application status</li> </Link>
   <Link to="/employeer/change-password" style={{textDecoration:"none"}}> <li className="list-group-item" style={{color:"black"}}>Change Password</li> </Link>
   {
    employeerRole()?
    <Link to="/employeer/profile" style={{textDecoration:"none"}}> <li className="list-group-item" style={{color:"black"}}>Employeer Dashboard</li> </Link>
  :"" 
  }
   
   <Link to="/user/logout"> <li  className="list-group-item " style={{cursor:'pointer',color:"black"}} >Log Out</li> </Link>
  </ul>
</div>
    </div>
  )
}

export default ProfilePopover