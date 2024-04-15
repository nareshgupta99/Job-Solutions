import React, { useEffect, useState } from 'react'
import jobsData from '../../data/data'
import { useParams } from 'react-router-dom'

function JobsDetails() {
    const {jobId}=useParams();
    const [job,setJob]=useState({})
    useEffect(()=>{
        const result=jobsData.find((job)=>job.id==jobId)
        setJob(result)
        console.log(job)
    },[job])
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
                                    <h4>{job.RoleName}</h4>
                                </a>
                                <ul>
                                    <li>{job.CompanyName}</li>
                                    <li><i class="fas fa-map-marker-alt"></i>{job.Location}</li>
                                    <li>{job.sallery}</li>
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
                          <p>{job.jobDescription}</p>
                        </div>
                        <div class="post-details2  mb-50">
                             {/* <!-- Small Section Tittle --> */}
                            <div class="small-section-tittle">
                                <h4>Required Knowledge, Skills, and Abilities</h4>
                            </div>
                           <ul>
                               {/* {job.requiredSkills.map((skill)=>(
                                <li>{skill}</li>
                               ))} */}
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
                          <li>Posted date : <span>{job.postedDate}</span></li>
                          <li>Location : <span>{job.Location}</span></li>
                          <li>Vacancy : <span>{job.numberOfOpening}</span></li>
                          <li>Job nature : <span>{job.jobType}</span></li>
                          <li>Salary :  <span>$7,800 yearly</span></li>
                          <li>Application date : <span>{job.postedDate}</span></li>
                      </ul>
                     <div class="apply-btn2">
                        <a href="#" class="btn">Apply Now</a>
                     </div>
                   </div>
                    <div class="post-details4  mb-50">
                        {/* <!-- Small Section Tittle --> */}
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
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobsDetails