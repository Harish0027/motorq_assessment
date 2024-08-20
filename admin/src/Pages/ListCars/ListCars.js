import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListCars.css";
import axios from "axios";
import { toast } from "react-toastify";

const ListCars = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/car/getAll");
        if (res.data.success) {
          setList(res.data.cars);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, []);

  const onRemoveItem = async (licenseNumber) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/car/delete/${licenseNumber}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setList(list.filter((item) => item.licenseNumber !== licenseNumber));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item");
    }
  };

  return (
    <div className="list">
      <div className="carList">
        {list.length === 0 ? (
          <h2>No cars added yet !!</h2>
        ) : (
          <>
            <div className="head">Car List</div>
            <div className="list-table-format title">
              <b className="img">Image</b>
              <b className="make">Make</b>
              <b className="model">Model</b>
              <b className="year">Year</b>
              <b className="rentRate">Rent Rate</b>
              <b className="location">Location</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img
                  className="img"
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt="car"
                />
                <p className="make">{item.make}</p>
                <p className="model">{item.model}</p>
                <p className="year">{item.year}</p>
                <p className="rentRate">{item.rentRate}</p>
                <p className="location">{item.location}</p>
                <div className="actions">
                  <i
                    onClick={() => onRemoveItem(item.licenseNumber)}
                    className="fa-solid fa-trash"
                    style={{ cursor: "pointer", color: "red" }}
                  ></i>
                  <i
                    onClick={() => navigate(`/edit/${item.licenseNumber}`)}
                    className="fa-regular fa-pen-to-square"
                    style={{ cursor: "pointer", color: "blue" }}
                  ></i>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ListCars;
