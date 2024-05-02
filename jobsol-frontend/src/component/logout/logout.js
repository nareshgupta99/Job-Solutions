import React, { useContext ,useEffect} from 'react';

import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate=useNavigate()
  
  useEffect(() => {
    
    setAuth({
      user: null,
      isLoggedIn: false
    });

    // Perform any additional logout actions (e.g., clear local storage)
    localStorage.removeItem('token');
    navigate("/")
  
  }, [])
  

  const handleLogout = () => {
    // Clear authentication state (e.g., set user to null, isLoggedIn to false)
   

    // Redirect to login page after logout
   
  };

  return (
    <div>
     
    </div>
  );
};

export default Logout;
