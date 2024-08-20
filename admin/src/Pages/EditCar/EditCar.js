import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditCar.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const EditCar = () => {
  const { licenseNumber } = useParams(); // Get licenseNumber from URL
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [rentRate, setRentRate] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/car/getBylicence/${licenseNumber}`
        );

        if (res.status === 200) {
          const car = res.data.car;
          setCurrentImage(car.image);
          setDescription(car.description);
          setLocation(car.location);
          setRentRate(car.rentRate);
          setYear(car.year);
          setMake(car.make);
          setModel(car.model);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
        toast.error("Failed to fetch car data. Please try again.");
      }
    };

    fetchCarData();
  }, [licenseNumber]);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description && !location && !rentRate && !year && !make && !model) {
      toast.error("No changes to save.");
      return;
    }

    const yearNumber = parseInt(year, 10);

    if (isNaN(yearNumber)) {
      toast.error("Invalid year format.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("rentRate", rentRate);
    formData.append("year", yearNumber); // Ensure the year is a number
    formData.append("make", make);
    formData.append("model", model);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/car/edit/${licenseNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/list-cars");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car. Please try again.");
    }
  };

  return (
    <div className="edit">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="flex-col edit-img-upload">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : currentImage || assets.upload_area
              }
              alt="Car preview"
            />
          </label>
          <input onChange={handleImageChange} type="file" id="image" hidden />
        </div>
        <div className="edit-product-name flex-col">
          <p>Location</p>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Set location"
            required
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>Rent rate</p>
          <input
            type="text"
            name="rentRate"
            value={rentRate}
            onChange={(e) => setRentRate(e.target.value)}
            placeholder="Set rent rate /hr"
            required
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>License Number</p>
          <input
            type="text"
            name="licenseNumber"
            value={licenseNumber}
            disabled
            placeholder="Enter license number"
            required
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>Year</p>
          <input
            type="text"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
            required
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>Make</p>
          <input
            type="text"
            name="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Enter make"
            required
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>Model</p>
          <input
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter model"
            required
          />
        </div>
        <div className="edit-product-description flex-col">
          <p>Description</p>
          <textarea
            name="description"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write content here"
            required
          />
        </div>
        <button type="submit" className="edit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCar;
