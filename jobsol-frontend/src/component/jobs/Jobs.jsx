import React, { useState, useEffect } from 'react'
import { getAllJobs } from '../../service/jobService';
import { Link } from 'react-router-dom';
import {  } from '../../service/helper';


function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getAllJobs(page); // Await the API call to get response
        let newJobs = response.data.jobs// Extract data from response
        for (let i = 0; i < newJobs.length; i++) {
          newJobs[i].roleDetails = newJobs[i].roleDetails.split('\n');
          newJobs[i].jobDescription = newJobs[i].jobDescription.split('\n');
          // newJobs[i].duration=calculateDaysBetweenDates(newJobs[i].createdAt)
          newJobs[i].createdAt=newJobs[i].createdAt.split("T")[0]
          console.log(newJobs[i].duration)
        }
        console.log(newJobs.length%10)
        setJobs(newJobs)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData immediately when component mounts or when 'page' changes
  }, [page]); // Re-run effect whenever 'page' changes

  const nextPage = () => {
       setPage(page+1)
  };

  const prevPage=()=>{
    setPage(page-1);
  }




  return (
    <>
    <section class="featured-job-area feature-padding">
      <div class="container">
        {/* <!-- Section Tittle --> */}
        <div class="row">
          <div class="col-lg-12">
            <div class="section-tittle text-center">
              <span>Recent Job</span>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-xl-10">
            {/* <!-- single-job-content --> */}
            {jobs.map((job, index) => (


              <div class="single-job-items mb-30" key={index}>
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
                  <Link to  ={`/job/${job.jobId}`}>{job.workMode}</Link>
                  <span>{job.createdAt}</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
    <div class="pagination-area pb-115 text-center">
    <div class="container">
        <div class="row">
            <div class="col-xl-12">
                <div class="single-wrap d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-start">

                        <li class="page-item"><a class="page-link" href="#"><span class="ti-angle-left" onClick={prevPage}></span></a></li>
                          
                            <li class="page-item active"><button class="page-link" href="#">{page}</button></li>


                       
                            
                        <li class="page-item"><a class="page-link" href="#"><span class="ti-angle-right" onClick={nextPage}></span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
</>

  )
}

export default Jobs