import React, { useEffect, useState } from 'react'


function JobPosting() {
    
    const inputBoxStyle = {
        border: "none",
        outline: "none",
        backgroundColor: "#F2F2F2"
    }
    const [employeer, setEmployeer] = useState({
        companyName: "",
        designation: "",
        NoOfEmployee: "",
        email: "",
        password: "",
        contactPerson: ""
    })
    useEffect(() => {
        // getEmployeerProfile().then((data) => {
        //     setEmployeer(data)
        //     console.log(data)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }, []);

  
  return (
    <main className="content px-3 py-4" style={{ width: "100vw", }}>
            <div className="container-fluid"style={{ border: "1px solid #F2F2F2", padding: "15px" }} >
                <div className="mb-3">
                    <h3 className="fw-bold fs-4 mb-3">{employeer.companyName} Dashboard</h3>
                    <div className="row" >
                        <div className="col-12 col-md-6 ">
                            <div className="card border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold">
                                        Profile Name
                                    </h5>
                                    <input className="mb-2 fw-bold"   style={inputBoxStyle} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Experince
                                    </h5>
                                    <input className="mb-2 fw-bold"  style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>

                    </div>

                    {/*2 section  */}
                    <div className="row" >

                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Location
                                    </h5>
                                    <input className="mb-2 fw-bold"  style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Sallery
                                    </h5>
                                    <input className="mb-2 fw-bold"  style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3rd section */}

                    <div className="row" >

                        <div className="col-12 col-md-12 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Job Description
                                    </h5>
                                    <textarea rows={5} cols={"60"} className="mb-2 fw-bold"  style={{...inputBoxStyle,paddingRight:"50px"}} />

                                </div>
                            </div>
                        </div>

                        <button type="button" class="btn " style={{float:"right"}} >Save</button>
                        </div>
                    
                        
                    

                </div>
               
            </div>
        </main>
  )
}

export default JobPosting