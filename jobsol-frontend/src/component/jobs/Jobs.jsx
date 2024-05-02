import React, {  useState,useEffect } from 'react'
import jobsData from "../../data/data";
import { getAllJobs } from '../../service/jobService';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllJobs(page); // Await the API call to get response
          const newJobs = response.data.jobs;
          console.log(response.data.jobs) // Extract data from response
          setJobs(jobs); // Update jobs state with new data
        //   setPage(prevPage => prevPage + 1); // Increment page number
        //   console.log(newJobs); // This will log the previous state, not the updated state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call fetchData immediately when component mounts or when 'page' changes
    }, [page]); // Re-run effect whenever 'page' changes
  
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        // Increment 'page' when scrolled to the bottom
        setPage(prevPage => prevPage + 1);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); // Add scroll event listener when component mounts and remove on unmount
  


    return (
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
                                        <a href="job_details.html"><h4>{job.profileName}</h4></a>
                                        <ul>
                                            <li>{job.CompanyName}</li>
                                            <li><i class="fas fa-map-marker-alt"></i>{job.location}</li>
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

    )
}

export default Jobs