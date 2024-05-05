import React, { useEffect, useState } from 'react'
import { createJob } from '../../service/jobService'
import { toast } from 'react-toastify';


function JobPosting() {
    
    const inputBoxStyle = {
        border: "none",
        outline: "none",
        backgroundColor: "#F2F2F2"
    }
    const [job, setJob] = useState({
        sallery: "",
        jobDescription: "",
        profileName: "",
        experienceRequired: "",
        noOfOpenning: "",
        roleDetails:"",
        workMode:"",
        location:""
    })

    const handleChange=(e)=>{
        setJob({...job,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await createJob(job)
            const {data}=res
            toast.success(data.message)

        }catch(err){
            console.log(err)
            toast.error(err.message);
        }

    }
    
  
  return (
    <main className="content px-3 py-4" style={{ width: "100vw", }}>
            <div className="container-fluid"style={{ border: "1px solid #F2F2F2", padding: "15px" }} >
                <div className="mb-3">
                    <h3 className="fw-bold fs-4 mb-3">Post a Job</h3>
                    <div className="row" >
                        <div className="col-12 col-md-4 ">
                            <div className="card border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold">
                                        Profile Name
                                    </h5>
                                    <input className="mb-2 fw-bold" name="profileName" onChange={handleChange} style={inputBoxStyle} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Experince
                                    </h5>
                                    <input className="mb-2 fw-bold" name='experienceRequired' onChange={handleChange} style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Opening
                                    </h5>
                                    <input className="mb-2 fw-bold" name='noOfOpenning' onChange={handleChange}  style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>


                    </div>

                    {/*2 section  */}
                    <div className="row" >

                        <div className="col-12 col-md-4 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Location
                                    </h5>
                                    <input className="mb-2 fw-bold" name='location' onChange={handleChange} style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Sallery
                                    </h5>
                                    <input className="mb-2 fw-bold" name="sallery" onChange={handleChange} style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Work Mode
                                    </h5>
                                    <input className="mb-2 fw-bold" name='workMode' onChange={handleChange}  style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 3rd section */}

                    <div className="row" >

                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Job Description
                                    </h5>
                                    <textarea rows={5} cols={"60"} className="mb-2 fw-bold" onChange={handleChange} name={"jobDescription"}  style={{...inputBoxStyle,paddingRight:"50px"}} />

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Role Details
                                    </h5>
                                    <textarea rows={5} cols={"60"} className="mb-2 fw-bold" onChange={handleChange} name='roleDetails' style={{...inputBoxStyle,paddingRight:"50px"}} />

                                </div>
                            </div>
                        </div>

                        <button type="button" class="btn "  onClick={handleSubmit}>Save</button>
                        </div>
                    
                        
                    

                </div>
               
            </div>
        </main>
  )
}

export default JobPosting