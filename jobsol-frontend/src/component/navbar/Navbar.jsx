import React, { useState } from 'react'
import {Link} from 'react-router-dom';

function Navbar() {
    const searchBox = {
        border: "none",
        outline: "none",
        padding: "2px"
    }
    const [search, setSearch] = useState([]);
    const [role, setRole] = useState("ROLE_SEEKER");

    const [data,setData]=useState({
        jobrole:"",
        location:"",
        company:""

    })

    const changeHandler=(e)=>{
        e.preventDefault();
        setData({...data,[e.target.name]:e.target.value})
        console.log(data)
    }

    

    return (
        <div style={{ background: "white", width: "100%", height: "80px", boxShadow: "0 0 whitesmoke", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: 'flex', height: "100%", alignItems: "center" }} className='logo'>

                <p style={{ margin: "60px" }}> <Link to="/home" style={{textDecoration:"none"}} > JobSolution </Link></p>
            </div>
            <div name="searchContainer" style={{}}>

                <div style={{ border: "1px solid black", padding: "12px", borderRadius: "10px" }}>
                    <input type="input" placeholder='JoB Role' name='jobrole' style={searchBox} value={data.jobrole} onChange={changeHandler} />/
                    <input type="input" placeholder='location ' name="location" style={searchBox} value={data.location} onChange={changeHandler} />/
                    <input type="input" placeholder='company' style={searchBox} value={data.company} onChange={changeHandler} />
                </div>

                <div style={{ border: "0px solid black", borderRadius: "6px", padding: "4px", borderTop: "none" }}>
                    {search.map((data) => (

                        <div>
                            {data}
                            <div style={{ borderBottom: "1px solid grey", padding: "2px 0px" }}></div>
                        </div>
                    ))}
                </div>

            </div>
            <div style={{ display: "flex" }} name="login-signup-container">
                <p style={{ padding: "10px",textAlign: "center",borderRadius: "5px",color: "green"  }}><Link to={(role==="ROLE_SEEKER"?"/candidate/signup":"/")} style={{textDecoration:"none"}}>Login/signup </Link></p>
                <div>
                    <select name="role-select" id="" style={{ padding: "10px", marginRight: "10px", outline: "none", border: "none" }} onChange={(e)=>{setRole(e.target.value)}}>
                        <option value="ROLE_SEEKER">Seeker</option>
                        <option value="ROLE_EMPLOYEER">Employeer</option>

                    </select>
                </div>

            </div>

        </div>
    )
}

export default Navbar