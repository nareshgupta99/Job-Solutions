import React, { useContext, useState } from 'react'
import { employeerSignup } from '../../service/authService';
import AuthContext from '../../context/AuthContext';

function Register() {

    const {setToken}=useContext(AuthContext);

    const [data,setData]=useState({
        email:"",
        contactPerson:"",
        phone:"",
        numberEmployee:0,
        designation:"",
        city:"",
        companyName:"",
        password:""
    })

    const handleChange=(e)=>{
        e.preventDefault();
        setData({...data,[e.target.name]:e.target.value});
        console.log(data);
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
           const res=await employeerSignup(data)
           setToken("token",res.data.token)
            
        }catch(err){
            console.log(err)
        }

    }
    


    const container = {
        // maxWidth: "400px",
        margin: " 20px auto",
        marginTop: "40px",
        padding: "100px",
        backgroundColor: "#fff",
        bordeRadius: "4px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
    }
    const input = {
        width: "100%",
        background: "transparent",
        borderBottom: "1px solid",
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        color: "black",
        fontSize: "15px",
        letterSpacing: "1px",
        marginTop: "30px",
        fontFamily: "sans - serif",
        outline: "none"
    }
    const button= {
        padding:" 10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        textAlign: "center"
      }
    return (
        <div className="container" style={container}>

            <form action="/action_page.php">
                {/* <div style={{display:'flex'}}> */}

                <input type="text" id="myInput" placeholder="Name" style={input} name="contactPerson" onChange={handleChange} />
                <input type="text" id="myInput" placeholder="Contact number" style={input} name='phone' onChange={handleChange}/><br />
                <br />
                <input type="text" id="myInput" placeholder="Company/Consultancy name" style={input} name='companyName' onChange={handleChange}/>
                <select name="NumberEmployee"  style={input}  onChange={handleChange}>
                    <option value="No.of employees" style={input}>No.of employees</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>

                </select>

                <input type="text" id="myInput" placeholder="Designation name" style={input} name='designation' onChange={handleChange} />
                <input type="text" id="myInput" placeholder="Email ID" style={input} name='email'  onChange={handleChange}/>
                <input type="text" id="myInput" placeholder="City" style={input} name='city' onChange={handleChange}/>
                <input type="text" id="myInput" placeholder="password" style={input} name='password' onChange={handleChange}/>
                <br />
                <br />
                <button type="submit" style={button} onClick={handleSubmit}>Submit</button>

            </form>
        </div>
    )
}

export default Register;