import React, { useEffect, useState } from 'react'
import { getEmployeerProfile } from '../../../service/employeerService'


function EmployerProfile() {
    const [isEdit,setIsEdit]=useState(false)
    const toggleEdit=()=>{
        setIsEdit(!isEdit)
    }
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
        getEmployeerProfile().then((data) => {
            setEmployeer(data)
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <main className="content px-3 py-4" style={{ width: "100vw" }}>
            <div className="container-fluid">
                <div className="mb-3">
                    <h3 className="fw-bold fs-4 mb-3">{employeer.companyName} Dashboard</h3>
                    <div className="row" style={{ border: "1px solid #F2F2F2", padding: "15px" }}>
                        <div className="col-12 col-md-6 ">
                            <div className="card border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold">
                                        Name
                                    </h5>
                                    <input className="mb-2 fw-bold"  readOnly={!isEdit} style={inputBoxStyle} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Email
                                    </h5>
                                    <input className="mb-2 fw-bold" readOnly={!isEdit} style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>

                    </div>

                    {/*2 section  */}
                    <div className="row" style={{ border: "1px solid #F2F2F2", padding: "15px", marginTop: "30px" }}>

                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        No.Of Employee
                                    </h5>
                                    <input className="mb-2 fw-bold" readOnly={!isEdit} style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Designation
                                    </h5>
                                    <input className="mb-2 fw-bold" readOnly={!isEdit} style={inputBoxStyle} />

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3rd section */}

                    <div className="row" style={{ border: "1px solid #F2F2F2", padding: "15px", marginTop: "30px" }}>

                        <div className="col-12 col-md-12 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Company Name
                                    </h5>
                                    <input className="mb-2 fw-bold" readOnly={!isEdit} style={{...inputBoxStyle,paddingRight:"50px"}} />

                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                {
                    isEdit==false?
                <button type="button" class="btn " style={{float:"right"}} onClick={toggleEdit}>Edit</button>
                :
                <button type="button" class="btn " style={{float:"right"}} onClick={toggleEdit}>Save</button>
                }
            </div>
        </main>
    )
}

export default EmployerProfile