import React, { useContext, useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { CgProfile } from "react-icons/cg";
import { Popover } from "antd";
import ProfilePopover from '../popover/ProfilePopover';
import { getUserDetails } from '../../service/userService';
import logo from '../../img/logo.jpeg'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { auth } = useContext(AuthContext)
    const {userDetails}=auth
    const [profile,setProfile]=useState();

    useEffect(()=>{
        if(auth.isLoogedIn){

            userDetails.then((res)=>{
                setProfile(res.data)
            })
        }
    },[])

    const menueToggler = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }
    const searchBox = {
        border: "none",
        outline: "none",
        padding: "2px"
    }
    const [search, setSearch] = useState([]);
    const [role, setRole] = useState("ROLE_SEEKER");

    const [data, setData] = useState({
        jobrole: "",
        location: "",
        company: ""

    })

    const changeHandler = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <header>
            {/* <!-- Header Start --> */}
            <div className="header-area header-transparrent">
                <div className="headder-top header-sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-2">
                                {/* <!-- Logo --> */}
                                <div className="logo">
                                    <Link to="/home" style={{color:"black"}}>
                                        {/* <img src={logo}  style={{width:"100px"}}alt="" /> */}
                                        Job Solution
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <div className="menu-wrapper">
                                    {/* <!-- Main-menu --> */}
                                    <div className="main-menu">
                                        <nav className="d-none d-lg-block">
                                            <ul id="navigation">
                                                <li><Link to="/home">Home</Link></li>
                                                <li><Link to="/jobs"> Jobs </Link></li>
                                                <li><Link to="about.html">About</Link></li>
                                                <li><Link to="#">Page</Link>
                                                    <ul className="submenu">
                                                        <li><Link to="blog.html">Blog</Link></li>
                                                        <li><Link to="single-blog.html">Blog Details</Link></li>
                                                        <li><Link to="elements.html">Elements</Link></li>
                                                        <li><Link to="job_details.html">job Details</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link to="contact.html">Contact</Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* <!-- Header-btn --> */}
                                    <div className="header-btn d-none f-right d-lg-block">
                                        {!(auth.user && auth.isLoogedIn) ?

                                            <>
                                                <Link to="/auth/user/signup" className="btn head-btn1">Register</Link>
                                                <Link to="/auth/user/login" className="btn head-btn2 ">Login</Link>
                                            </>
                                            : <div className='d-flex '><Link to="/user/logout" className="btn head-btn2 ">logout     </Link>
                                            <li className="nav-item">
                                            <Link className="nav-link " to="/seeker/profile">
                                              <Popover placement="bottom" content={<ProfilePopover profile={profile}/>} >
                                                <CgProfile size={35} style={{color:"black"}} />
                                              </Popover>
                                            </Link>
                                          </li>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Mobile Menu --> */}
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none">
                                    <div className='slicknav_menu'>
                                        <Link to="#" aria-haspopup="true" role="button" tabindex="0" className="slicknav_btn slicknav_collapsed" onClick={menueToggler}><span className="slicknav_menutxt">MENU</span><span className="slicknav_icon">
                                            <span className="slicknav_icon-bar"></span><span className="slicknav_icon-bar"></span><span className="slicknav_icon-bar"></span></span></Link>
                                        <ul className="slicknav_nav slicknav_hidden" aria-hidden="true" role="menu" style={isOpen === false ? { display: "none" } : { display: "block" }}>
                                            <li><Link to="index.html" role="menuitem" tabindex="-1">Home</Link></li>
                                            <li><Link to="job_listing.html" role="menuitem" tabindex="-1">Find Link Jobs </Link></li>
                                            <li><Link to="about.html" role="menuitem" tabindex="-1">About</Link></li>
                                            <li className="slicknav_collapsed slicknav_parent"><Link to="#" role="menuitem" aria-haspopup="true" tabindex="-1" className="slicknav_item slicknav_row" style={{ outline: "none" }}><Link to="#" tabindex="-1">Page</Link>
                                                <span className="slicknav_arrow">+</span></Link><ul className="submenu slicknav_hidden" role="menu" aria-hidden="true" style={{ display: " none" }}>
                                                    <li><Link to="blog.html" role="menuitem" tabindex="-1">Blog</Link></li>
                                                    <li><Link to="single-blog.html" role="menuitem" tabindex="-1">Blog Details</Link></li>
                                                    <li><Link to="elements.html" role="menuitem" tabindex="-1">Elements</Link></li>
                                                    <li><Link to="job_details.html" role="menuitem" tabindex="-1">job Details</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to="contact.html" role="menuitem" tabindex="-1">Contact</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Navbar