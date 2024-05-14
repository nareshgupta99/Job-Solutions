import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import ForgotPassword from "./component/forgot/ForgotPassword";
import ResetPage from "./component/reset/ResetPage";
import Jobs from "./component/jobs/Jobs";
import JobsDetails from "./component/jobs/JobDetails";
import RegisterCandidate from "./component/signup/RegisterCandidate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./component/login/Login";
import AuthRoutes from "./routes/AuthRoutes";
import Logout from "./component/logout/logout";
import EmployerProfile from "./component/employeerDashboard/profile/EmployerProfile";
import EmployeerRoutes from "./routes/EmployeerRoutes";
import SeekerRoutes from "./routes/SeekerRoutes";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Profile from "./component/seekerProfile/Profile";
import JobPosting from "./component/employeerDashboard/JobPosting";
import EmployeerJobs from "./component/employeerDashboard/Jobs";
import Applications from "./component/employeerDashboard/Applications";
import CreateProfile from "./component/seekerProfile/CreateProfile";
import ApplicationsStatus from "./component/seekerApplication/ApplicationStatus";
import ChangePassword from "./component/reset/ChangePassword";
import ChatBot from "./component/bot/ChatBot";

function App() {
  const { auth } = useContext(AuthContext);
  const { user } = auth
  const roles = user?.roles
  function checkRoleSeeker() {
    let isSeeker = false;
    for (let i = 0; i < roles?.length; i++) {
      if (roles[i].roleName == 'ROLE_SEEKER') isSeeker = true
    }
    return isSeeker;
  }


  return (
    <BrowserRouter>

      {/* Render navbar if role is seeker or user id logged out */}
      {
        checkRoleSeeker() || user == null ?
          <Navbar />
          : ""
      }
      <ToastContainer position="top-center" autoClose={5000} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="user/logout" element={<Logout />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:jobId" element={<JobsDetails />} />
        <Route path="/chat" element={<ChatBot />} />

        {/* Employeer Route */}
        <Route path="/employeer" element={<EmployeerRoutes />}>
          <Route path="profile" element={<EmployerProfile />} />
          <Route path="job/post" element={<JobPosting />} />
          <Route path="jobs" element={<EmployeerJobs />} />
          <Route path="apllications/:jobId" element={<Applications />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/seeker" element={<SeekerRoutes />} >
          <Route path="profile" element={<Profile />} />
          <Route path="new" element={<CreateProfile />}/>
          <Route path="status" element={<ApplicationsStatus />}/>
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/auth" element={<AuthRoutes />} >
          <Route path="user/signup" element={<RegisterCandidate role={'ROLE_SEEKER'} />} />
          <Route path="employeer/signup" element={<RegisterCandidate role={'ROLE_EMPLOYEER'} />} />
          <Route path="user/login" element={<Login />} />
          <Route path='user/forgot' element={<ForgotPassword />} />
          <Route path="user/reset/:resetToken" element={<ResetPage />} />
        </Route >
        <Route path='*' element={<h1>404 error</h1>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
