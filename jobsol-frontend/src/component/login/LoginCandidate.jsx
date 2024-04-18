import React from 'react'
import useDelayedRender from '../../hooks/useDelayedRender'
import Preloader from '../preloader/Preloader'

function LoginCandidate() {
    const showComponent=useDelayedRender(100);

    
  return showComponent?(
    <div className="col-lg-4 border p-3 m-auto">
      <form className="form-contact contact_form" >
        <div className="row">
          
          <div className="col-sm-12">
            <div className="form-group">
              <input className="form-control valid" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="denis@example.com" />
            </div>
          </div>
          
          <div className="col-12">
            <div className="form-group">
              <input className="form-control" name="password" id="password" type="password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Password" />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <input className="form-control" name="confirmPassword" id="confirmPassword" type="password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Confirm Password" />
            </div>
          </div>
        </div>
        <div className="form-group mt-3">
          
          <button type="submit" className="button button-contactForm boxed-btn w-100">Login</button>
        </div>
      </form>
    </div>
  ):(
    <Preloader />
  )
}

export default LoginCandidate