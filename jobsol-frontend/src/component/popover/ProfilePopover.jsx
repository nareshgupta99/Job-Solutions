import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';





function ProfilePopover({profile}) {
  
  
  function checkInstructorRole(){
 return false;
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
    
    <p style={{fontSize:"20px"}}> {profile.name }</p></li> </Link>
   <Link to="" style={{textDecoration:"none"}} > <li className="list-group-item" style={{color:"black"}}>Application status</li> </Link>
   {checkInstructorRole()?
   <Link to="/instructor/overview" style={{textDecoration:"none",color:"black"}}> <li className="list-group-item" style={{color:"black"}}>Instructor DashBoard</li> </Link>
  :""}
   <Link to="/auth/change-password" style={{textDecoration:"none"}}> <li className="list-group-item" style={{color:"black"}}>Change Password</li> </Link>
   <Link to="/logout"> <li  className="list-group-item " style={{cursor:'pointer',color:"black"}} >Log Out</li> </Link>
  </ul>
</div>
    </div>
  )
}

export default ProfilePopover