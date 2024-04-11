import React, { useState } from 'react'

function Navbar() {
    const searchBox = {
        border: "none",
        outline: "none",
        padding: "2px"
    }
    const [search, setSearch] = useState([]);
    const [jobrole, setJobRole] = useState("");
    const [location, setLocation] = useState("");
    const [company, setCompany] = useState("");

    const jobHandler = (event) => {
        event.preventDefault();
        setJobRole(event.target.value)
    }

    const locationHandler = (event) => {
        event.preventDefault();
        setLocation(event.target.value)
    }

    const companyHandler = (event) => {
        event.preventDefault();
        setCompany(event.target.value)
    }


    return (
        <div style={{ background: "white", width: "100%", height: "80px", boxShadow: "0 0 whitesmoke", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: 'flex', height: "100%", alignItems: "center" }} className='logo'>

                <p style={{ margin: "60px" }}>  JobSolution</p>
            </div>
            <div name="searchContainer" style={{}}>

                <div style={{ border: "1px solid black", padding: "12px", borderRadius: "10px" }}>
                    <input type="input" placeholder='JoB Role' name='job-role' style={searchBox} value={jobrole} onChange={jobHandler} />/
                    <input type="input" placeholder='location ' name="location" style={searchBox} value={location} onChange={locationHandler} />/
                    <input type="input" placeholder='company' style={searchBox} value={company} onChange={companyHandler} />
                </div>

                <div style={{ border: "1px solid black", borderRadius: "6px", padding: "4px", borderTop: "none" }}>

                    {search.map((data) => (

                        <div>
                            {data}
                            <div style={{ borderBottom: "1px solid grey", padding: "2px 0px" }}></div>
                        </div>
                    ))}
                </div>

            </div>
            <div style={{ display: "flex" }} name="login-signup-container">
                <button style={{
                    padding: "10px",
                    textAlign: "center",
                    borderRadius: "5px",
                    color: "green"
                }}>Login/signup</button>
                <div>
                    <select name="cars" id="cars" style={{ padding: "10px", marginRight: "10px", outline: "none", border: "none" }}>
                        <option value="ROLE_SEEKER">Seeker</option>
                        <option value="ROLE_EMPLOYEER">Employeer</option>

                    </select>
                </div>

            </div>

        </div>
    )
}

export default Navbar