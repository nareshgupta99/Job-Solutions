import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { registerUser } from '../../service/authService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { getUserFromToken } from '../../service/authService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateProfile } from '../../service/userService';

function CreateProfile({ role }) {

  const {auth,setAuth}=useContext(AuthContext);

  const navigate = useNavigate();


  const [data, setData] = useState({
    name: "",
    contactNumber: "",
   currentLocation:""
  })

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const res =await updateProfile(data);
      const {message}=res.data
      toast.success(`${message} redirecting to homepage`)
      navigate("/");
    }catch(err){
      console.log(err)
    }
    
  }

  return (
    <div className="col-lg-4 border p-3 m-auto">
      <form className="form-contact contact_form" >
        <div className="row">
          <div className="col-sm-12 col-sm-7">
            <div className="form-group">
              <input className="form-control valid" name="name" id="name" type="text" placeholder="Enter Name " onChange={changeHandler} value={data.name} />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <input className="form-control valid" name="contactNumber" id="contactNumber" type="text" placeholder="Enter Number" onChange={changeHandler} value={data.contactNumber} />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <input className="form-control valid" name="currentLocation" id="currentLocation" type="text" placeholder="Enter city" onChange={changeHandler} value={data.currentLocation} />
            </div>
          </div>
         

        </div>
        <div className="form-group mt-3">

          <button type="submit" className="button button-contactForm boxed-btn w-100" onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProfile