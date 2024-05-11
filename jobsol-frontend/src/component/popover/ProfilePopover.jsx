import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';





function ProfilePopover({profile}) {
  
  
  function checkInstructorRole(){
 return false;
  }

  console.log(profile,"in popover")
    

  console.log(profile)
    
  const navigate=useNavigate();  
  return (
    <div >
 <div className="card" style={{width: "18rem"}}>
  <ul className="list-group list-group-flush" >
  <Link to="/seeker/profile" style={{textDecoration:"none"}} >  <li className="list-group-item pb-5"><img src={profile?.imageUrl} style={{width:"100px",height:"100px",borderRadius:"100%"}} /> <p style={{fontSize:"20px"}}> {profile.name }</p></li> </Link>
   <Link to="" style={{textDecoration:"none"}} > <li className="list-group-item" style={{color:"black"}}>My Course</li> </Link>
   {checkInstructorRole()?
   <Link to="/instructor/overview" style={{textDecoration:"none"}}> <li className="list-group-item">Instructor DashBoard</li> </Link>
  :""}
   <Link to="/auth/change-password" style={{textDecoration:"none"}}> <li className="list-group-item">Change Password</li> </Link>
   <Link to="/logout"> <li  className="list-group-item " style={{cursor:'pointer'}}>Log Out</li> </Link>
  </ul>
</div>
    </div>
  )
}

export default ProfilePopover