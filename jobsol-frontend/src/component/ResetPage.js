// import "../component/rest.css";
const ResetPage = () => {
  return (
    <div>
      <form>
        <div class="wrapper">
          <h1>Reset Password</h1>
          <br />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Your placeholder" />
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confrm=password"
            placeholder="Your confrm-password here"
          />
          <p id="error">demo text</p>
          <br />

          <input type="button" id="button" value="SUBMIT" />
        </div>
      </form>
    </div>
  );
};
export default ResetPage;
