import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { deleteProfilePic, deleteResume, getSeekerProfile, resumeUpload, updateProfile, updateProfilePic } from '../../service/userService';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg";
import { PiDownloadSimple } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdSave } from "react-icons/io";

const Profile = () => {


    const [image, setImage] = useState();
    const [profile, setProfile] = useState();
    const [isUploaded, setIsUploaded] = useState(false);
    const [isNameEdit, setIsNameEdit] = useState(false);
    const [isContactEdit, setIsContactEdit] = useState(false)
    const [isLocationEdit, setIsLocationEdit] = useState(false);

    const inputStyle = {
        border: "none",
        outline: "none"
    }


    const updatePic = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfilePic(image);
            toast.success("image uploaded")
            setIsUploaded(!isUploaded)

        } catch (err) {
            console.log(err)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
    }

    const deleImage = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteProfilePic();
            setIsUploaded(!isUploaded)
            toast.success(response.data.message)

        } catch (err) {
            console.log(err)
        }

    }

    const uploadResume = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            const response = await resumeUpload(file);
            setIsUploaded(!isUploaded)
            toast.success(response.data.message)

        } catch (err) {
            console.log(err)
        }
    }

    const resumeDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteResume();
            toast.success(response.data.message )
            console.log(response)
            setIsUploaded(!isUploaded)

        } catch (err) {
            console.log(err)
        }

    }

    const downloadResume = async () => {
        // Your file URL
        const fileUrl = profile?.resumeUrl // Replace with your file URL
            try {
                const response = await fetch(fileUrl);
                const blob = await response.blob();
                
                // Create a download link and trigger click to download
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${profile?.name}_Resume.pdf`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } catch (error) {
                console.error('Error downloading PDF:', error);
            }
    }

    const changeHandler = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }

    const saveProfile = async (e) => {
        e.preventDefault()
        updateProfile(profile).then((res) => console.log(res)).catch((err) => console.log(err));
        setIsContactEdit(false);
        setIsLocationEdit(false);
        setIsNameEdit(false)
    }

    useEffect(() => {

        getSeekerProfile().then((response) => {
            setProfile(response.data.seekerProfile)
        }).catch((err) => {

        })


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
                            <div className='d-flex' style={{ alignItems: "center" }}>
                                {
                                    isNameEdit ?
                                        <>
                                            <input type='text' name='name' style={inputStyle} onChange={changeHandler} />
                                            <IoMdSave style={{ cursor: "pointer" }} onClick={saveProfile} />

                                        </> :
                                        <>
                                            <h4 >{profile?.name}</h4>
                                            <MdOutlineEdit className='mx-2' style={{ cursor: "pointer" }} onClick={() => setIsNameEdit(!isNameEdit)} />
                                        </>

                                }

                            </div>

                            <h6 style={{ color: "grey" }}>Profile last updated {profile?.updatedAt?.split('T')[0]}</h6>
                        </div>
                        <div className='border-bottom'  ></div>
                        <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>

                            {
                                isLocationEdit ? <>
                                    <input type='text' name='currentLocation' style={inputStyle} onChange={changeHandler} />
                                    <IoMdSave style={{ cursor: "pointer" }} onClick={saveProfile} />

                                </> :
                                    <>
                                        <h6><CiLocationOn /> {profile?.currentLocation}</h6>
                                        <MdOutlineEdit className='mx-2' style={{ cursor: "pointer" }} onClick={() => setIsLocationEdit(!isLocationEdit)} />
                                    </>
                            }

                        </div>

                        <div style={{ float: "right" }}>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                {
                                    isContactEdit ?
                                        <>
                                            <input type='text' name='contactNumber' style={inputStyle} onChange={changeHandler} />
                                            <IoMdSave style={{ cursor: "pointer" }} onClick={saveProfile} />
                                        </>



                                        :
                                        <>
                                            <h6>
                                                <FiPhoneCall style={{ color: "grey" }} />
                                                {profile?.contactNumber}
                                            </h6>
                                            <MdOutlineEdit className='mx-2' style={{ cursor: "pointer" }} onClick={() => setIsContactEdit(!isContactEdit)} />
                                        </>


                                }
                            </div>

                            <div>

                                <h6> <CiMail style={{ color: "grey" }} />{profile?.email}</h6>
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


                <div class="" style={{ width: "100%" }}>
                    <h4 style={{ margin: '10px' }}>Resume </h4>


                    <div style={{ border: "2px dotted grey", width: "70%", margin: "auto", padding: "30px", borderRadius: "20px", marginBottom: "10px" }}>
                        {profile?.resumeUrl ? <div >
                            <span style={{border:"1px solid grey",padding:"8px",width:"150px" ,cursor: "pointer"}}>
                           { ` Resume`}
                            <PiDownloadSimple style={{ width: "50px", height: "30px",  }} onClick={downloadResume} />
                                </span>
                            <RiDeleteBin5Line style={{ width: "30px", height: "25px", cursor: "pointer" }} onClick={resumeDelete} />

                        </div> :

                            <input type='file' name="resume" onChange={uploadResume} />


                        }
                    </div>
                </div>



            </div>

        </>

    )
}

export default Profile