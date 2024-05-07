import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { deleteProfilePic, deleteResume, getSeekerProfile, resumeUpload, updateProfilePic } from '../../service/userService';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg";
import { PiDownloadSimple } from "react-icons/pi";

import { RiDeleteBin5Line } from "react-icons/ri";

const Profile = () => {


    const [image, setImage] = useState();
    const [profile, setProfile] = useState();
    const [isUploaded, setIsUploaded] = useState(false);


    const updatePic = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfilePic(image);
            toast.success()
            setIsUploaded(!isUploaded)

        } catch (err) {
            console.log(err)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        console.log(image)

    }

    const deleImage = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteProfilePic();
            console.log(response)
            setIsUploaded(!isUploaded)
            toast.success()

        } catch (err) {
            console.log(err)
        }

    }

    const uploadResume=async(e)=>{
        e.preventDefault();
        try {
            const file = e.target.files[0];
            const response = await resumeUpload(file);
            console.log(response)
            setIsUploaded(!isUploaded)
            toast.success()

        } catch (err) {
            console.log(err)
        }
    }

    const resumeDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteResume();
            toast.success()

        } catch (err) {
            console.log(err)
        }

    }

    const downloadResume=()=>{
       
            // Your file URL
            const fileUrl = profile?.resumeUrl // Replace with your file URL
        
            // Trigger download
            const anchor = document.createElement('a');
            anchor.href = fileUrl;
            anchor.download = 'filename'; // Specify the file name here
            anchor.click();
       
    }

    useEffect(() => {

        getSeekerProfile().then((response) => {
            console.log(profile)
            setProfile(response.data.seekerProfile)
        }).catch((err) => {

        })
        //    console.log(res)

    }, [isUploaded])

    return (
        <>
            <div className='border' style={{ margin: "auto", width: "90%" }}>


                <div class="" style={{ display: "flex" }}>
                    <div style={{ display: "block", width: "245px" }}>

                        <div style={{ width: '150px', height: "150px", display: "block", margin: "10px" }}>
                            {
                                profile?.imageUrl ?
                                    <img style={{ width: '100%', height: "100%", borderRadius: "50%" }} src={profile?.imageUrl} />
                                    : <CgProfile style={{ width: '100%', height: "100%" }} />

                            }
                        </div>
                        <div style={{ display: 'flex', marginTop: "20px" }}>
                            <button style={{ border: 'none', background: 'white', color: "blue", cursor: 'pointer' }} onClick={deleImage}>Delete</button>
                            <button style={{ border: 'none', background: 'white', color: "blue", cursor: 'pointer' }} onClick={updatePic}>update</button>
                            <input type='file' name="image" onChange={handleImageChange} />

                        </div>
                    </div>
                    <div style={{ width: "60%" }}>

                        <div style={{ margin: "20px", width: '80%' }}>
                            <h4>{profile?.name}</h4>
                            <h6 style={{ color: "grey" }}>Profile last updated {profile?.updatedAt.split('T')[0]}</h6>
                        </div>
                        <div className='border-bottom'  ></div>
                        <div style={{ marginTop: "20px" }}>
                            <h6><CiLocationOn /> {profile?.currentLocation}</h6>
                        </div>

                        <div style={{ float: "right" }}>

                            <div style={{ display: "flex", textAlign: "" }}>
                                <h6><FiPhoneCall style={{ color: "grey" }} />
                                    {profile?.contactNumber}</h6>
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

            {/* Resume start */}
            <div className='border' style={{ margin: "auto", width: "90%", marginTop: "40px" }}>


                <div class="" style={{  width: "100%" }}>
                    <h4 style={{ margin: '10px' }}>Resume </h4>



                    <div >
                        <PiDownloadSimple style={{ width: "30px", height: "25px", cursor: "pointer" }} onClick={downloadResume}/>
                        <RiDeleteBin5Line style={{ width: "30px", height: "25px", cursor: "pointer" }} onClick={resumeDelete}/>

                    </div>

                    <div style={{border:"2px dotted grey",width:"70%",margin:"auto",padding:"30px",borderRadius:"20px",marginBottom:"10px"}}>
bdnb                    <input type='file' name="resume" onChange={uploadResume} />
                    </div>
                </div>



            </div>

        </>

    )
}

export default Profile