import React from 'react'
import { Link } from 'react-router-dom'
import h1_hero from '../../img/h1_hero.jpg'

function Slider() {
    const selectStyle = {

        height: "70px",
        width: "100%",
        color: "#777777",
        fontSize: "18px",
        fontWeight: "400",
        padding: "9px 33px 9px 32px",
        border: "none",
        borderRadius: "0px",
        position: "relative",

    }
    return (
        <div className="slider-area ">
            {/* <!-- Mobile Menu --> */}
            <div className="slider-active">
                <div className="single-slider slider-height d-flex align-items-center" data-background="assets/img/hero/h1_hero.jpg" style={{ backgroundImage: `url(${h1_hero})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-9 col-md-10">
                                <div className="hero__caption">
                                    <h1>Find the most exciting startup jobs</h1>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Search Box --> */}
                        <div className="row">
                            <div className="col-xl-8">
                                {/* <!-- form --> */}
                                <form action="#" className="search-box">
                                    <div className="input-form">
                                        <input type="text" placeholder="Job Tittle or keyword" />
                                    </div>
                                    <div className="select-form" >
                                        <div className="select-itms">
                                            {/* <select name="select" id="select1" style={selectStyle}>
                                                <option value="">Location BD</option>
                                                <option value="">Location PK</option>
                                                <option value="">Location US</option>
                                                <option value="">Location UK</option>
                                            </select> */}
                                            <input type="text" placeholder="Job Tittle or keyword" style={selectStyle}/>
                                        </div>
                                    </div>
                                    <div className="search-form">
                                        <Link to="">Find job</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Slider