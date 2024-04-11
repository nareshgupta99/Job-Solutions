// import "../component/forgot.css";
const ForgotPassword = () => {
  return (
    <div>
      <div class="wrapper">
        <h1>Forgot Password</h1>
        <h3>For my Recover your Account.</h3>
        <div className="inputs">
          <div className="field">
            <span className="material-icons">email</span>
            <input type="text" placeholder="Find your Email or Phone" />
          </div>
          <button type="submit">Send</button>
        </div>
        <div className="link1">
          <p>
            Back To <a href="http://">Signin.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
