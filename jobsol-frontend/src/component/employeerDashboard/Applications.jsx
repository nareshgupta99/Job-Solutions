import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdSimCardDownload } from "react-icons/md";



function Applications() {
    const [isEdit, setIsEdit] = useState(false)
    const [jobs, setJobs] = useState([{
        profileName: "ML Enginner",


    }]);
    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    const inputBoxStyle = {
        border: "none",
        outline: "none",
        backgroundColor: "#F2F2F2"
    }

    const handleDelete = () => {

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
                                        <th scope="col"></th>
                                        <th scope="col">Seeker Name</th>
                                        <th scope="col">email </th>
                                        <th scope="col">Resume </th>
                                        <td>Status</td>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr  >
                                        <td style={{ width: "70px", height: "70px", }}><img style={{ width: "100%", borderRadius: "50%", marginTop: "0px" }} src="https://imgs.search.brave.com/mR-qTglzpGl8uw83n_ErbMNuZKXcqnfulrRGN17nsn0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc" /></td>
                                        <td>Mark</td>
                                        <td>Thornton</td>
                                        <td>PENDING</td>
                                        <td className='' style={{ padding: "15px 10px " }} >
                                            <button  style={{backgroundColor:"#FB246A"}}><MdSimCardDownload />
                                            </button></td>
                                        <td ><button className='' style={{backgroundColor:"#FB246A"}}><MdDelete style={{ color: "white", cursor: "pointer" }} onClick={handleDelete} />
                                        </button></td>
                                        <td><button className='btn' style={{ padding: "15px 10px" }}>Update</button></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>


                    </div>



                </div>

            </div>
        </main>
    )
}

export default Applications;