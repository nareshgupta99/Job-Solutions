import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';





function ApplicationsStatus() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([1]);

    useEffect(() => {

        // getAllApllicationByJob(jobId).then((res) => {
        //     setApplications(res.data.applications);
        //     console.log(res.data)
        // }).catch((err) => {
        //     console.log(err)
        // })

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
                                        <th scope="col">Company Name</th>
                                        <th scope="col">Status </th>
                                        <td scope="col">Last Updated</td>
                                    </tr>
                                </thead>

                                <tbody>{applications.map((application) => (




                                    <tr  >
                                        <td>{"profile Name"}</td>

                                        <td>      
                                                <p>{"company name"}</p>
                                        </td>
                                        <td>{"status "}</td>
                                        <td>{"last updated"}</td>
                                        
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>


                    </div>



                </div>

            </div>
        </main>
    )
}

export default ApplicationsStatus;