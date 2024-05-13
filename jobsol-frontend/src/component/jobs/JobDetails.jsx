import React, { useContext, useEffect, useState } from 'react'
import jobsData from '../../data/data'
import { Link, useParams } from 'react-router-dom'
import { getJobById } from '../../service/jobService';
import { applyJob } from '../../service/applicationService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';


function JobsDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState({})
    const {auth}=useContext(AuthContext);
    const {Applications}=auth
    const [applied,setApplied]=useState(false);

    
    useEffect(() => {
        getJobById(jobId).then((response) => {
            const { data } = response
            data.roleDetails=data.roleDetails.trim();
            data.jobDescription=data.jobDescription.trim();
            data.roleDetails = data.roleDetails.split('\n');
            data.jobDescription = data.jobDescription.split('\n');
            data.createdAt=data.createdAt.split("T")[0]
            setJob(data);
            console.log(data)
        }).catch((err) => {
            console.log(err)

        })
        Applications.then((res)=>{
            const applications=res.data.applications;
            for(let i=0;i<applications.length;i++){
                if(applications[i].JobID==jobId){
                    setApplied(true);
                }
            }
        }).catch((err)=>{

        })
        console.log(applied)
    }, [])

    const apply=async ()=>{
        try{
            const response= await applyJob(job.jobId);
            toast.success(response.data.message)
            setApplied(true)
        }catch(err){
            console.log(err)
            toast.error()
        }
    }



    return (
        // <!-- job post company Start -->
        <div class="job-post-company pt-120 pb-120">
            <div class="container">
                <div class="row justify-content-between">
                    {/* <!-- Left Content --> */}
                    <div class="col-xl-7 col-lg-8">
                        {/* <!-- job single --> */}
                        <div class="single-job-items mb-50">
                            <div class="job-items">
                                <div class="company-img company-img-details">
                                    <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                                </div>
                                <div class="job-tittle">
                                    <a href="#">
                                        <h4>{job?.profileName}</h4>
                                    </a>
                                    <ul>
                                        <li>{job?.CompanyName}</li>
                                        <li><i class="fas fa-map-marker-alt"></i>{job?.location}</li>
                                        <li>{job?.sallery}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- job single End --> */}

                        <div class="job-post-details">
                            <div class="post-details1 mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div class="small-section-tittle">
                                    <h4>Job Description</h4>
                                </div>
                                {job.jobDescription?.map((des)=>(
                                    <p>{des}</p>

                                ))

                                 } 
                            </div>
                            <div class="post-details2  mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div class="small-section-tittle">
                                    <h4>Required Knowledge, Skills, and Abilities</h4>
                                </div>
                                <ul>
                                    {job.roleDetails?.map((details)=>(
                                <li>{details}</li>
                               ))}
                                </ul>
                            </div>
                            <div class="post-details2  mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div class="small-section-tittle">
                                    <h4>Education + Experience</h4>
                                </div>
                                <ul>
                                    {/* {job.educations.map((edu)=>(
                                <li>{edu}</li>
                               ))} */}
                                </ul>
                            </div>
                        </div>

                    </div>
                    {/* <!-- Right Content --> */}
                    <div class="col-xl-4 col-lg-4">
                        <div class="post-details3  mb-50">
                            {/* <!-- Small Section Tittle --> */}
                            <div class="small-section-tittle">
                                <h4>Job Overview</h4>
                            </div>
                            <ul>
                                <li>Posted date : <span>{job?.createdAt}</span></li>
                                <li>Location : <span>{job?.location}</span></li>
                                <li>Vacancy : <span>{job?.noOfOpenning}</span></li>
                                {/* <li>Job nature : <span>{job?.jobType}</span></li> */}
                                <li>Salary :  <span>${job.sallery}</span></li>
                                <li>Application date : <span>{job?.createdAt}</span></li>
                            </ul>
                            <div class="apply-btn2">
                                {applied?

                                    <button class="" style={{padding:"10px",backgroundColor:"green"}} >Applied</button>
                                    :
                                <button onClick={apply} class="btn">Apply Now</button>
                                }
                            </div>
                        </div>
                        {/* <div class="post-details4  mb-50">
                            
                            <div class="small-section-tittle">
                                <h4>Company Information</h4>
                            </div>
                            <span>Colorlib</span>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            <ul>
                                <li>Name: <span>Colorlib </span></li>
                                <li>Web : <span> colorlib.com</span></li>
                                <li>Email: <span>carrier.colorlib@gmail.com</span></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobsDetails