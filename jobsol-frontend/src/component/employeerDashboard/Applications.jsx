import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { MdSimCardDownload } from "react-icons/md";
import { getAllApllicationByJob, updateStatusByApplicationId } from '../../service/applicationService';




function Applications() {
    const [isEdit, setIsEdit] = useState(false  )
    const { jobId } = useParams();
    const [isUpdated,setIsUpdated]=useState();
    const [applications, setApplications] = useState([]);

    const [status,setStatus]=useState();
    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    const inputBoxStyle = {
        border: "none",
        outline: "none",
        backgroundColor: "#F2F2F2"
    }

    const resumeDownload = async(url,name) => {
        const fileUrl =url// Replace with your file URL
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            
            // Create a download link and trigger click to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}_Resume.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }

    const handleSelect=(e)=>{
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    const toogle=()=>{
        setIsEdit(!isEdit)
    }

    const updateStatus=async (e,id)=>{
        e.preventDefault();
        try{
            const res=updateStatusByApplicationId(id,{status})
            console.log(res)
            setIsEdit(!toogle)
            setIsUpdated(true)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {

        getAllApllicationByJob(jobId).then((res) => {
            setApplications(res.data.applications);
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }, [isUpdated]);

    return (
        <main className="content px-3 py-4" style={{ width: "100vw" }}>
            <div className="container-fluid">
                <div className="mb-3">
                    <h3 className="fw-bold fs-4 mb-3"> Posted Jobs</h3>
                    <div className="row">
                        <div className="col-12  ">
                            <table class="table table-striped table-dark caption-top">

                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Seeker Name</th>
                                        <th scope="col">email </th>
                                        <th scope="col">Status </th>
                                        <td scope="col">Resume</td>
                                        {/* <th scope="col"></th> */}
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>{applications.map((application) => (




                                    <tr  >
                                        <td style={{ width: "80px", height: "80px", }}><img style={{ width: "100%", height:"100%",borderRadius: "50%", marginTop: "0px" }} src={application.pic} /></td>
                                        <td>{application.name}</td>
                                        <td>{application.email}</td>

                                        <td>
                                            {isEdit ?
                                            <div class="form-floating">
                                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" name="status" onChange={handleSelect}>
                                            <option >Select</option>
                                              <option value="RESUME_VIEWED">RESUME_VIEWED</option>
                                              <option value="RESUME_SELECTED">RESUME_SELECTED</option>
                                            </select>
                                            
                                          </div>:
                                                
                                                <p>{application.ApplicationStatus}</p>
                                            }
                                        </td>
                                        <td className='' style={{ padding: "15px 10px " }} >
                                            <button style={{ backgroundColor: "#FB246A" }}><MdSimCardDownload  onClick={()=>resumeDownload(application.resume,application.name)}/>
                                            </button></td>
                                       
                                        <td>
                                            {
                                                isEdit ? <button className='btn' style={{ padding: "15px 10px" }} onClick={(e)=>{updateStatus(e,application.ApplicationId)}}>Update</button> :
                                                    <button className='btn' style={{ padding: "15px 10px" }} onClick={toogle}>Edit</button>
                                            }

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>


                    </div>



                </div>

            </div>
        </main>
    )
}

export default Applications;