import React, { useEffect, useState } from 'react'
import jobsData from "../../data/data";
import useDelayedRender from '../../hooks/useDelayedRender';
import Preloader from '../preloader/Preloader';

function Jobs() {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        setJobs(jobsData);
    }, [jobs])

    const showComponent=useDelayedRender(1000)


    return showComponent ?(
        <section class="featured-job-area feature-padding">
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>Recent Job</span>
                            <h2>Featured Jobs</h2>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        {/* <!-- single-job-content --> */}
                        {jobs.map((job) => (


                            <div class="single-job-items mb-30">
                                <div class="job-items">
                                    <div class="company-img">
                                        <a href="job_details.html"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                                    </div>
                                    <div class="job-tittle">
                                        <a href="job_details.html"><h4>{job.RoleName}</h4></a>
                                        <ul>
                                            <li>{job.CompanyName}</li>
                                            <li><i class="fas fa-map-marker-alt"></i>{job.Location}</li>
                                            <li>{job.sallery}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="items-link f-right">
                                    <a href="job_details.html">{job.jobType}</a>
                                    <span>{job.postingTime}</span>
                                </div>
                            </div>
                        ))}
                       
                    </div>
                </div>
            </div>
        </section>

    ):(
        <Preloader />
    )
}

export default Jobs