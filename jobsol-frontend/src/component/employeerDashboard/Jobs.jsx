import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { deleteJobById, getJobsByEmployeer } from '../../service/jobService';


function Jobs() {
    const [isDelete, setIsDelete] = useState(false)
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        getJobsByEmployeer().then((res) => {
            setJobs(res.data.jobs)
            console.log(jobs);

        }).catch(() => {

        })

    }, [isDelete])
    

    const inputBoxStyle = {
        border: "none",
        outline: "none",
        backgroundColor: "#F2F2F2"
    }

    const deleteJob = (id) => {
        // event.preventDefault;
        console.log(id)
        try{
            const res=deleteJobById(id);
            console.log(res)
            setIsDelete(!isDelete)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {

    }, []);

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
                                        <th scope="col">Profile Name</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">No Of Application</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {jobs.map((job) => (

                                        <tr >
                                            <Link to={`/employeer/apllications/${job.jobId}`}>
                                                <td>{job.profileName}</td>
                                            </Link>
                                            <td>{job.createdAt?.split("T")[0]}</td>
                                            <td>{job.noOfApplication}</td>
                                            <td><MdDelete style={{ color: "red", cursor: "pointer" }} onClick={()=>deleteJob(job.jobId)} /></td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>                        </div>


                    </div>



                </div>
                {/* {
                    isEdit == false ?
                       
                        :
                        <button type="button" class="btn " style={{ float: "right" }} onClick={toggleEdit}>Save</button>
                } */}
            </div>
        </main>
    )
}

export default Jobs;