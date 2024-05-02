import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';


function Jobs() {
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

    const handleDelete=()=>{

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
                                        <th scope="col">Profile Name</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">No Of Application</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr >
                                        <Link to="">
                                        <td>Mark</td>
                                        </Link>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        <td><MdDelete style={{ color: "red",cursor:"pointer" }}  onClick={handleDelete}/></td>

                                    </tr>

                                </tbody>
                            </table>                        </div>


                    </div>



                </div>
                {/* {
                    isEdit == false ?
                       
                        :
                        <button type="button" class="btn " style={{ float: "right" }} onClick={toggleEdit}>Save</button>
                } */}
            </div>
        </main>
    )
}

export default Jobs;