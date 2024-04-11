import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupLogin from "./component/signup/SignupLogin";
import Home from "./component/home/Home";


function App() {

  return (
    <BrowserRouter>
    {/* <Navbar /> */}
      <Routes>
        <Route path="/signup" element={<SignupLogin />} />
        <Route path='/' element={<Home /> } />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* <Route path="/reset-password" element={<ResetPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
