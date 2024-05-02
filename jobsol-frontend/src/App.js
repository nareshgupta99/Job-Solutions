import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import ForgotPassword from "./component/forgot/ForgotPassword";
import ResetPage from "./component/reset/ResetPage";
import Jobs from "./component/jobs/Jobs";
import JobsDetails from "./component/jobs/JobDetails";
import RegisterCandidate from "./component/signup/RegisterCandidate";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./component/employeerDashboard/Sidebar";
import Login from "./component/login/Login";
import AuthRoutes from "./routes/AuthRoutes";
import Logout from "./component/logout/logout";

function App() {
  // console.log(user)

  return (
    <BrowserRouter>

      <Navbar />
      <ToastContainer position="top-center" autoClose={5000} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="user/logout" element={<Logout />} />
        <Route path="/auth" element={<AuthRoutes />} >
          {/* <Route path='/user/logout' element={ } /> */}
          <Route path="user/signup" element={<RegisterCandidate role={'ROLE_SEEKER'} />} />
          <Route path="employeer/signup" element={<RegisterCandidate role={'ROLE_EMPLOYEER'} />} />
          <Route path="user/login" element={<Login />} />
          <Route path='user/forgot' element={<ForgotPassword />} />
          <Route path="user/reset/:resetToken" element={<ResetPage />} />
          
        </Route >
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

// const {resetToken}= useParams("resetToken");