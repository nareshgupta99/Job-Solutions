import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { registerUser } from '../../service/authService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { getUserFromToken } from '../../service/authService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateProfile({ role }) {

  const {auth,setAuth}=useContext(AuthContext);

  const navigate = useNavigate();


  const [data, setData] = useState({
    name: "",
    contactNumber: "",
    dob: new Date(),
    gender: "",
  })

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  }

  return (
    <div className="col-lg-4 border p-3 m-auto">
      <form className="form-contact contact_form" >
        <div className="row">
          <div className="col-sm-12 col-sm-7">
            <div className="form-group">
              <input className="form-control valid" name="name" id="name" type="text" placeholder="Denis " onChange={changeHandler} value={data.name} />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <input className="form-control valid" name="contactNumber" id="contactNumber" type="text" placeholder="12215333367" onChange={changeHandler} value={data.email} />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group ">
            <DatePicker selected={data.dob} />
            </div>
          </div>
         
          <div className="col-12">
            <div className="form-group">
              <div style={{ display: "flex ", justifyContent: "" }}>
                <div>

                  <label>Male</label>
                  <input type="radio" className="" name="gender" onChange={changeHandler} value="male" />
                </div>
                <div>

                  <label>Female</label>
                  <input type="radio" className="" name="gender" onChange={changeHandler} value="female" />
                </div>
              </div>
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