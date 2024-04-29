import { BrowserRouter, Route, Routes } from "react-router-dom";
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
// import LoginCandidate from "./component/signupCandidate/SignupCandidate";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./component/employeerDashboard/Sidebar";

function App() {
  const { setToken } = useContext(AuthContext);

  return (
    <BrowserRouter>

      {/* <Navbar /> */}
      <ToastContainer position="top-center" autoClose={5000} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/user/logout' element={setToken("")} />
        <Route path="/user/signup" element={<RegisterCandidate role={'ROLE_SEEKER'} />} />
        <Route path="/employeer/signup" element={<RegisterCandidate role={'ROLE_EMPLOYEER'} />} />
        {/* <Route path="/user/login" element={""} /> */}
        <Route path='/candidate/forgot' element={<ForgotPassword />} />
        <Route path="/candidate/reset/:resetToken" element={<ResetPage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:jobId" element={<JobsDetails />} />
        <Route path="/side" element={<Sidebar />} />

        <Route path="/auth" element={<PrivateRoutes />} >

        </Route>


        <Route path='*' element={<h1>404 error</h1>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
