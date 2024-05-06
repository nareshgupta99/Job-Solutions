import React, { useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { updateProfilePic } from '../../service/userService';
import { toast } from 'react-toastify';

const Profile = () => {


    const [image,setImage]=useState();

    const updatePic=async (e)=>{
        e.preventDefault();
        try{
            const response=await updateProfilePic(image);
            console.log(image ,"in profile ")
            toast.success()

        }catch(err){
            console.log(err)
        }
    }

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        setImage(file)
        console.log(image)
    }

    const deleImage=async (e)=>{
        e.preventDefault();
        try{
            const response=await updateProfilePic(image);
            console.log(response)
            toast.success()

        }catch(err){
            console.log(err)
        }
    
    }


    return (
        <>
            <div className='border' style={{ margin: "auto", width: "90%" }}>


                <div class="" style={{ display: "flex" }}>
                    <div style={{ display: "block", width: "245px" }}>

                        <div style={{ width: '150px', display: "block", margin: "10px" }}>
                            <img style={{ width: '100%', borderRadius: "50%" }} src={"https://imgs.search.brave.com/Bih0LtdLSuJHDJjKkbxUa7sRmcS9c-Qk9EB62WJ6sp0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/b3JiaXRtZWRpYS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMDYvQW5keS1Q/cm9maWxlLTYwMC5w/bmc"} />
                        </div>
                        <div style={{ display: 'flex', marginTop: "20px" }}>
                            <button style={{ border: 'none', background: 'white', color: "blue", cursor: 'pointer' }}>Delete</button>
                            <button style={{ border: 'none', background: 'white', color: "blue", cursor: 'pointer' }} onClick={updatePic}>update</button>
                            <input type='file' name="image" onChange={handleImageChange} />

                        </div>
                    </div>
                    <div style={{ width: "60%" }}>

                        <div style={{ margin: "20px", width: '80%' }}>
                            <h4>Naresh Gupta</h4>
                            <h6 style={{ color: "grey" }}>Profile last updated -02 May 2024</h6>
                        </div>
                        <div className='border-bottom'  ></div>
                        <div style={{ marginTop: "20px" }}>
                            <h6><CiLocationOn /> Mathura</h6>
                        </div>

                        <div style={{float:"right"}}>

                            <div style={{display:"flex" ,textAlign:""}}>
                                <h6><FiPhoneCall style={{ color: "grey" }} /> 
                                7417049176</h6>
                            </div>

                            <div>

                               <h6> <CiMail style={{ color: "grey" }} />nareshgupta0899@gmail.com</h6>
                            </div>

                        </div>
                    </div>

                    <div className='border-start'></div>
                    <div style={{ marginTop: "120px" }}>


                    </div>

                </div>
            </div>

            <div class="col-xl-3 col-lg-3 col-md-4">


                {/* // <!-- Job Category Listing start --> */}
                <div class="job-category-listing mb-50">
                    {/* <!-- single one --> */}
                    <div class="single-listing">


                        <div class="select-Categories pt-80 pb-50">
                            <div class="small-section-tittle2">
                                <h4>Job Type</h4>
                            </div>
                            <label class="container">Full Time
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Part Time
                                <input type="checkbox" checked="checked active" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Remote
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Freelance
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        {/* <!-- select-Categories End --> */}
                    </div>
                    {/* <!-- single two --> */}
                    <div class="single-listing">
                        <div class="small-section-tittle2">
                            <h4>Job Location</h4>
                        </div>
                        {/* <!-- Select job items start --> */}
                        <div class="select-job-items2">
                            <select name="select">
                                <option value="">Anywhere</option>
                                <option value="">Category 1</option>
                                <option value="">Category 2</option>
                                <option value="">Category 3</option>
                                <option value="">Category 4</option>
                            </select>
                        </div>
                        {/* <!--  Select job items End--> */}
                        {/* <!-- select-Categories start --> */}
                        <div class="select-Categories pt-80 pb-50">
                            <div class="small-section-tittle2">
                                <h4>Experience</h4>
                            </div>
                            <label class="container">1-2 Years
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">2-3 Years
                                <input type="checkbox" checked="checked active" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">3-6 Years
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">6-more..
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        {/* <!-- select-Categories End --> */}
                    </div>
                    {/* <!-- single three --> */}
                    <div class="single-listing">
                        {/* <!-- select-Categories start --> */}
                        <div class="select-Categories pb-50">
                            <div class="small-section-tittle2">
                                <h4>Posted Within</h4>
                            </div>
                            <label class="container">Any
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Today
                                <input type="checkbox" checked="checked active" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Last 2 days
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Last 3 days
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Last 5 days
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Last 10 days
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        {/* <!-- select-Categories End --> */}
                    </div>
                    <div class="single-listing">
                        {/* <!-- Range Slider Start --> */}
                        <aside class="left_widgets p_filter_widgets price_rangs_aside sidebar_box_shadow">
                            <div class="small-section-tittle2">
                                <h4>Filter Jobs</h4>
                            </div>
                            <div class="widgets_inner">
                                <div class="range_item">
                                    {/* <div id="slider-range"></div> */}

                                    <input type="text" class="js-range-slider" value="" />
                                    <div class="d-flex align-items-center">
                                        <div class="price_text">
                                            <p>Price :</p>
                                        </div>
                                        <div class="price_value d-flex justify-content-center">
                                            <input type="text" class="js-input-from" id="amount" readonly />
                                            <span>to</span>
                                            <input type="text" class="js-input-to" id="amount" readonly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        {/* <!-- Range Slider End --> */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile