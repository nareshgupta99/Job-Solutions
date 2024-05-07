import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../employeerDashboard/sidebar.css';
import JobPosting from './JobPosting';
import Jobs from './Jobs';
import Applications from './Applications';
import SeekerProfile from './SeekerProfile';
import EmployerProfile from '../employeerDashboard/profile/EmployerProfile'

function Sidebar() {
    const [toogler, setToogler] = useState(true)
    const menueToggler = () => {
        setToogler(!toogler)
    }
    return (
        <div className='wrapper' style={{height:"100vh"}}>


            <aside id="sidebar" className={toogler == true ? 'expand' : ""}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={menueToggler} >
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <div className="sidebar-logo">
                        <Link to="">JobSolution</Link>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/employeer/profile" className="sidebar-link">
                            <i className="lni lni-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/employeer/job/post" className="sidebar-link">
                            <i className="lni lni-agenda"></i>
                            <span>Post a Job</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/employeer/jobs" className="sidebar-link">
                            <i className="lni lni-popup"></i>
                            <span>Show Jobs</span>
                        </Link>
                    </li>
                    {/* <li className="sidebar-item">
                        <Link to="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                            <i className="lni lni-protection"></i>
                            <span>Auth</span>
                        </Link>
                        <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <Link to="#" className="sidebar-link">Login</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="#" className="sidebar-link">Register</Link>
                            </li>
                        </ul>
                    </li> */}
                    {/* <li className="sidebar-item">
                        <Link to="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                            <i className="lni lni-layout"></i>
                            <span>Multi Level</span>
                        </Link>
                        <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <Link to="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                                    data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                    Two Links
                                </Link>
                                <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                    <li className="sidebar-item">
                                        <Link to="#" className="sidebar-link">Link 1</Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to="#" className="sidebar-link">Link 2</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li> */}
                    <li className="sidebar-item">
                        <Link to="#" className="sidebar-link">
                            <i className="lni lni-popup"></i>
                            <span>Notification</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="#" className="sidebar-link">
                            <i className="lni lni-cog"></i>
                            <span>Setting</span>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <Link to="/user/logout" className="sidebar-link">
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
            {/* <Applications /> */}
            {/* <SeekerProfile /> */}
            <Outlet />
        </div>
    )
}

export default Sidebar