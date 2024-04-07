import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupLogin from "../src/component/SignupLogin";
import ForgotPassword from "../src//component/ForgotPassword";
import ResetPage from "./component/ResetPage";
import Navbar from "./component/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* <Route path="/signup" element={<SignupLogin />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* <Route path="/reset-password" element={<ResetPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
