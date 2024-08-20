import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./Components/LoginPopUp/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyBookings from "./pages/myBookings/MyBookings";
import Home from "./pages/Home/Home";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isLogin && <LoginPopup setIsLogin={setIsLogin} />}
      <div className="App">
        <ToastContainer />
        <Navbar isLoggedIn={isLogin} setIsLoggedIn={setIsLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-booking" element={<MyBookings />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
