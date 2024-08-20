import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [rentRate, setRentRate] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("rentRate", rentRate);
    formData.append("licenseNumber", licenseNumber);
    formData.append("year", year);
    formData.append("make", make);
    formData.append("model", model);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/car/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        // Reset the form fields
        setImage(null);
        setDescription("");
        setLocation("");
        setRentRate("");
        setLicenseNumber("");
        setYear("");
        setMake("");
        setModel("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="flex-col add-img-upload">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
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
        <div className="add-product-name flex-col">
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
        <div className="add-product-name flex-col">
          <p>License Number</p>
          <input
            type="text"
            name="licenseNumber"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="Enter license number"
            required
          />
        </div>
        <div className="add-product-name flex-col">
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
        <div className="add-product-name flex-col">
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
        <div className="add-product-name flex-col">
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
        <div className="add-product-description flex-col">
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
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
