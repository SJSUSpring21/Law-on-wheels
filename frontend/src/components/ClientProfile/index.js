import React from "react";

import "./ClientProfile.css";

const ClientProfile = () => {
  return (
    <div className="container">
      <div className="leftbox">
        <nav>
          <a className="tab active">
            <i className="fa fa-user"></i>
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
                <input type="text" name="name" className="input1" />
                <h2>Email</h2>
                <input type="email" name="email" className="input1" />
                <h2>Date Of Birth</h2>
                <input type="number" name="dob" className="input1" />
                <h2>Phone Number</h2>
                <input
                  type="tel"
                  pattern="^[0-9]+$"
                  minLength="10"
                  maxLength="10"
                  name="phoneNumber"
                  className="input1"
                />
                <h2>Aadhar Card Number</h2>
                <input type="text" name="aadhar" className="input1" />
                <h2>Gender</h2>
                <input type="text" name="gender" className="input1" />
              </div>
              <div className="col">
                <h2>Street Address</h2>
                <input type="text" name="address" className="input1" />
                <h2>State</h2>
                <input type="text" name="state" className="input1" />
                <h2>City</h2>
                <input type="text" name="city" className="input1" />
                <h2>Zip Code</h2>
                <input type="number" name="zipcode" className="input1" />
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
