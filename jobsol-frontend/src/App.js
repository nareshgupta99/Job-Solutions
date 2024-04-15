import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupLogin from "./component/signup/SignupLogin";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import ForgotPassword from "./component/forgot/ForgotPassword";
import ResetPage from "./component/reset/ResetPage";
import Register from "./component/employeer/Register";
import Jobs from "./component/jobs/Jobs";
import JobsDetails from "./component/jobs/JobDetails";
import RegisterCandidate from "./component/signup/RegisterCandidate";
import LoginCandidate from "./component/login/LoginCandidate";


function App() {
  const {setToken}=useContext(AuthContext);

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/candidate/signup" element={<RegisterCandidate />} value={"false"}/>
        <Route path="/candidate/login" element={<LoginCandidate />} value={true}/>
        <Route path='/' element={<Home /> } />
        <Route path='/home' element={<Home /> } />
        <Route path='/logout' element={ setToken("")}/>
        <Route path='/candidate/forgot' element={<ForgotPassword />}/>
        <Route path="/candidate/reset/:resetToken" element={<ResetPage />} />
        <Route path="/employer/signup" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:jobId" element={<JobsDetails />} />
        

        <Route path='*' element={<h1>404 error</h1> } />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* <Route path="/reset-password" element={<ResetPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
