import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignupLogin from "../src/component/SignupLogin";
import './App.css';

function App() {
  return (
    

    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupLogin />} />
      </Routes>
    
    </BrowserRouter>

    );
}

export default App;
