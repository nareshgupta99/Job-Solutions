import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupLogin from "../src/component/SignupLogin";
import ForgotPassword from "../src//component/ForgotPassword";

import "./App.css";
import ResetPage from "./component/ResetPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
