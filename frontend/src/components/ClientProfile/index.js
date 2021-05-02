import React, { useState, useEffect } from "react";
//import backendServer from "../../webConfig";
//import axios from "axios";
import "./ClientProfile.css";

const ClientProfile = () => {
  // const [data, setData] = useState({
  //   name: " ",
  //   email: " ",
  //   dob: " ",
  //   phoneNumber: " ",
  //   aadhar: " ",
  //   gender: " ",
  //   address: " ",
  //   state: " ",
  //   city: " ",
  //   zipcode: " ",
  // });

  // useEffect(() => {
  //   let profileData = "608a2dfdbd761e579448b6b0";
  //   axios.defaults.withCredentials = true;
  //   axios
  //     .post(`${backendServer}/users/profile`, profileData)
  //     .then((response) => {
  //       console.log("response after post", response);
  //     })
  //     .catch((error) => {
  //       alert("Failed to add expense");
  //       console.log("error:", error);
  //     });
  // });

  // const {
  //   name,
  //   email,
  //   dob,
  //   phoneNumber,
  //   aadhar,
  //   gender,
  //   address,
  //   state,
  //   city,
  //   zipcode,
  // } = data;

  // const onChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  // const onUpdate = (e) => {
  //   e.preventDefault();
  //   console.log("inside update function");
  //   console.log("name :", data.name);
  //   console.log("email :", data.email);
  // };

  return (
    <div className="container">
      <div className="leftbox">
        <nav>
          <a onClick="tabs(0)" className="tab active">
            <i className="fa fa-user"></i>
          </a>
          <a onClick="tabs(1)" className="tab ">
            <i className="fa fa-tasks"></i>
          </a>
        </nav>
      </div>
     

 <div className="rightbox">
        <form action="">
          
          <div className="">
            <div className="row">
              <div className="col">
                <h1>Primary Information</h1>
                <h2>Name</h2>
                <input
                  type="text"
                  name="name"
                  // onChange={onChange}
                  className="input1"
                />
                <h2>Email</h2>
                <input
                  type="email"
                  name="email"
                  // onChange={onChange}
                  className="input1"
                />
                <h2>Date Of Birth</h2>
                <input
                  type="number"
                  name="dob"
                  //  onChange={onChange}
                  className="input1"
                />
                <h2>Phone Number</h2>
                <input
                  type="tel"
                  pattern="^[0-9]+$"
                  minLength="10"
                  maxLength="10"
                  name="phoneNumber"
                  //  onChange={onChange}
                  className="input1"
                />
                <h2>Aadhar Card Number</h2>
                <input
                  type="text"
                  name="aadhar"
                  //  onChange={onChange}
                  className="input1"
                />
                <h2>Gender</h2>
                <input
                  type="text"
                  name="gender"
                  //  onChange={onChange}
                  className="input1"
                />
              </div>
              <div className="col">
                <h2>Street Address</h2>
                <input
                  type="text"
                  name="address"
                  //onChange={onChange}
                  className="input1"
                />
                <h2>State</h2>
                <input
                  type="text"
                  name="state"
                  // onChange={onChange}
                  className="input1"
                />
                <h2>City</h2>
                <input
                  type="text"
                  name="city"
                  //onChange={onChange}
                  className="input1"
                />
                <h2>Zip Code</h2>
                <input
                  type="number"
                  name="zipcode"
                  //onChange={onChange}
                  className="input1"
                />
              </div>
            </div>
          </div>
          <button className="btn1">Update</button>
        </form>
        </div>
    </div>
  );
};

export default ClientProfile;
