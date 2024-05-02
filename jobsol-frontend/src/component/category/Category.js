import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllCategires } from '../../service/categoriesService';

function Category() {

    const [categories,setCategories]=useState([]);
  
   
    return (
        <div className="our-services section-pad-t30">
            <div className="container">
                {/* <!-- Section Tittle --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                           
                            <h2>Browse Top Categories </h2>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-contnet-center">
                    {/*  */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-tour"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Design & Creative</Link></h5>
                                <span>(653)</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-cms"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Design & Development</Link></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-report"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Sales & Marketing</Link></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-app"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Mobile Application</Link></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-helmet"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Construction</Link></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-high-tech"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Information Technology</Link></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-real-estate"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Real Estate</Link></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-services text-center mb-30">
                            <div className="services-ion">
                                <span className="flaticon-content"></span>
                            </div>
                            <div className="services-cap">
                                <h5><Link to="job_listing.html">Content Writer</Link></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- More Btn --> */}
                {/* <!-- Section Button --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="browse-btn2 text-center mt-50">
                            <Link to="job_listing.html" className="border-btn2">Browse All Sectors</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;