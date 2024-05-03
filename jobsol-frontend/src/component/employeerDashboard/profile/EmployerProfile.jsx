import React, { useEffect, useState } from 'react'
import { getEmployeerProfile,updateEmployeerProfile } from '../../../service/employeerService'
import { toast } from 'react-toastify';

function EmployerProfile() {
    const [isEdit,setIsEdit]=useState(false)
    const [employeerData,setEmployeerData]=useState({
        companyName: "",
        designation: "",
        NoOfEmployee: "",
        email: "",
        password: "",
        name:""
    })
    const toggleEdit=()=>{
        setIsEdit(!isEdit)
    }
    const inputBoxStyle = {
        border: "none",
        outline: "none",
        backgroundColor: "#F2F2F2",
        width:"300px"
    }
    const [employeer, setEmployeer] = useState({
        companyName: "",
        designation: "",
        NoOfEmployee: "",
        email: "",
        password: "",
        name:""
    })
    
    useEffect(() => {
        getEmployeerProfile().then((res) => {
            const {data}=res;
            setEmployeer({...data})

            // console.log(employeer)
        }).catch((err) => {
            console.log(err)
        })
    }, [    ]);
    
        
        const handleChange=(e)=>{
            setEmployeerData({...employeerData,[e.target.name]:e.target.value});
            console.log(employeerData)
            console.log("in handle change")
        }

        const updateProfile=async ()=>{
            
             updateEmployeerProfile(employeerData).then((res)=>{
                const {data}=res;
                toast.success(data.message)
                setIsEdit(!isEdit)
             }).catch((err)=>{
                toast.err(err.message)
             })
            
        }
    

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
                                    { isEdit?
                                        <input className="mb-2 fw-bold"   style={inputBoxStyle} name={"name"}  onChange={handleChange} />:
                                        <p style={inputBoxStyle}>{employeer.name}</p>

                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Email
                                    </h5>
                                    
                                        {/* <input className="mb-2 fw-bold"  style={inputBoxStyle} value={employeerData.email}  name='email' onChange={handleChange}/> */}
                                    
                                    <p style={inputBoxStyle}>{employeer.email}</p>
                                    
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
                                    </h5>{
                                        isEdit?
                                        <input className="mb-2 fw-bold"  style={inputBoxStyle} name='NoOfEmployee'   onChange={handleChange}/>
                                    :
                                    <p style={inputBoxStyle}>{employeer.NoOfEmployee}</p>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold" >
                                        Designation
                                    </h5>
                                    {
                                        isEdit?
                                        <input className="mb-2 fw-bold"  style={inputBoxStyle} name='designation'  onChange={handleChange}/>
                                    :
                                    <p style={inputBoxStyle}>{employeer.designation}</p>
                                    }

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
                                    {
                                        isEdit?
                                        <input className="mb-2 fw-bold"  style={{...inputBoxStyle,paddingRight:"50px"}} name='companyName' onChange={handleChange}/>
                                    :
                                    <p style={inputBoxStyle}>{employeer.companyName}</p>
                                    }

                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                {
                    isEdit==false?
                <button type="button" class="btn " style={{float:"right"}} onClick={toggleEdit}>Edit</button>
                :
                <button type="button" class="btn " style={{float:"right"}} onClick={updateProfile}>Save</button>
                }
            </div>
        </main>
    )
}

export default EmployerProfile