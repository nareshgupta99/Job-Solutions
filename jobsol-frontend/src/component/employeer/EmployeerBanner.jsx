import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

function EmployeerBanner() {

    const {auth}=useContext(AuthContext)
  return (
    <div className="support-company-area support-padding fix">
            <div className="container-fluid " style={{width:"100vw"}}>
                <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6">
                        <div className="right-caption">
                            {/* <!-- Section Tittle --> */}
                            <div className="section-tittle section-tittle2">
                                <span>What we are doing</span>
                                <h2>24k Talented people are getting Jobs</h2>
                            </div>
                            <div className="support-caption">
                                <p className="pera-top">Mollit anim laborum duis au dolor in voluptate velit ess cillum dolore eu lore dsu quality mollit anim laborumuis au dolor in voluptate velit cillum.</p>
                                <p>Mollit anim laborum.Duis aute irufg dhjkolohr in re voluptate velit esscillumlore eu quife nrulla parihatur. Excghcepteur signjnt occa cupidatat non inulpadeserunt mollit aboru. temnthp incididbnt ut labore mollit anim laborum suis aute.</p>
                                {
                                    auth.isLoogedIn==true?"":
                                <Link to="/auth/employeer/signup" className="btn post-btn">Post a job</Link>
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="support-location-img">
                            <img src="assets/img/service/support-img.jpg" alt="" />
                            <div className="support-img-cap text-center">
                                <p>Since</p>
                                <span>1994</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EmployeerBanner