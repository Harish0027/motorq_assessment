import React, { useState, useEffect } from "react";
import "./ListUser.css";
import axios from "axios";
import { toast } from "react-toastify";

const ListUser = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/getAll");
        if (res.data.success) {
          setList(res.data.users);
          toast.success(res.data.message);
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

  const onRemoveItem = async (customerId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/auth/delete/${customerId}` // Adjust the endpoint as needed
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setList(list.filter((item) => item.customerId !== customerId));
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
      <div className="userList">
        {list.length === 0 ? (
          <h2>No users found !!</h2>
        ) : (
          <>
            <div className="head">User List</div>
            <div className="list-table-format title">
              <b className="name">Name</b>
              <b className="email">Email</b>
              <b className="contact">Contact</b>
              <b className="address">Address</b>
              <b className="role">Role</b>
              <b className="price">Price</b>
              <b className="duration">Duration</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => (
              <div key={index} className="list-table-format">
                <p className="name">{item.name}</p>
                <p className="email">{item.email}</p>
                <p className="contact">{item.contact}</p>
                <p className="address">{item.address}</p>
                <p className="role">{item.role}</p>
                <p className="price">{item.price}</p>
                <p className="duration">{item.duration}</p>
                <p
                  onClick={() => onRemoveItem(item.customerId)}
                  className="remove"
                >
                  X
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ListUser;
