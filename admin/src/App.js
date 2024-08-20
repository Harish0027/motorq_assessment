import "./App.css";
import NavBar from "./Components/Navbar/NavBar";
import SideBar from "./Components/Sidebar/SideBar";
import { Routes, Route } from "react-router-dom";
import Add from "./Pages/Add/Add";
import ListCars from "./Pages/ListCars/ListCars";
import ListUser from "./Pages/ListUsers/ListUser";
import Bookings from "./Pages/Bookings/Bookings";
import EditCar from "./Pages/EditCar/EditCar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr className="hr" />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list-cars" element={<ListCars />} />
          <Route path="/list-users" element={<ListUser />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/edit/:licenseNumber" element={<EditCar />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
