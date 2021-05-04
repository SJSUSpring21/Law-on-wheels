import React, { Component } from "react";
import Server from "../../webConfig";
import axios from "axios";
import "./ClientProfile.css";
import profile from "../../images/avatar-black.svg";
import { ProfileContainer } from "./Newstyle.js";
import swal from "sweetalert";

class ClientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: localStorage.getItem("user_id"),
      userData: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  componentWillMount() {
    axios.defaults.withCredentials = true;
    axios
      .post(`${Server}/users/getUser/${localStorage.getItem("user_id")}`)
      .then((response) => {
        console.log("response data from get user is", response.data);
        this.setState({
          userData: response.data,
        });
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onUpdate = (e) => {
    e.preventDefault();

    const profileData = {
      user_id: this.state.user_id,
      name: this.state.name,
      email: this.state.email,
      dob: this.state.dob,
      phoneNumber: this.state.phoneNumber,
      aadhar: this.state.aadhar,
      gender: this.state.gender,
      address: this.state.address,
      state: this.state.state,
      city: this.state.city,
      zipcode: this.state.zipcode,
    };

    axios.defaults.withCredentials = true;
    axios
      .post(`${Server}/users/updateUser`, profileData)
      .then((response) => {
        console.log("response data from update user is", response.data);
        if (response.status === 200) {
          swal("Updated Successfully!", "success");
        }
      })
      .catch((error) => {
        console.log("error:", error);
        swal("Oops!", "Update Failed", "error");
      });
  };

  render() {
    return (
      <ProfileContainer>
        <div className="container">
          <div className="leftbox">
            <img
              className="img-fluid"
              src={profile}
              alt="profile picture"
              style={{ height: 150, width: 180 }}
            />
          </div>

          <div className="rightbox">
            <form onSubmit={this.onUpdate}>
              <h1>Primary Information</h1>
              <h2>Name</h2>
              <input
                type="text"
                name="name"
                defaultValue={this.state.userData.name}
                onChange={this.onChange}
                className="input1"
              />
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                defaultValue={this.state.userData.email}
                onChange={this.onChange}
                className="input1"
              />
              <h2>Date Of Birth</h2>
              <input
                type="text"
                name="dob"
                defaultValue={this.state.userData.dob}
                onChange={this.onChange}
                className="input1"
              />
              <h2>Phone Number</h2>
              <input
                type="tel"
                pattern="^[0-9]+$"
                minLength="10"
                maxLength="10"
                name="phoneNumber"
                defaultValue={this.state.userData.number}
                onChange={this.onChange}
                className="input1"
              />
              <h2>Aadhar Card Number</h2>
              <input
                type="text"
                name="aadhar"
                onChange={this.onChange}
                defaultValue={this.state.userData.aadhar}
                className="input1"
              />
              <h2>Gender</h2>
              <input
                type="text"
                name="gender"
                onChange={this.onChange}
                defaultValue={this.state.userData.gender}
                className="input1"
              />

              <h2>Street Address</h2>
              <input
                type="text"
                name="address"
                onChange={this.onChange}
                defaultValue={this.state.userData.address}
                className="input1"
              />
              <h2>State</h2>
              <input
                type="text"
                name="state"
                onChange={this.onChange}
                defaultValue={this.state.userData.state}
                className="input1"
              />
              <h2>City</h2>
              <input
                type="text"
                name="city"
                onChange={this.onChange}
                defaultValue={this.state.userData.city}
                className="input1"
              />
              <h2>Zip Code</h2>
              <input
                type="text"
                name="zipcode"
                onChange={this.onChange}
                defaultValue={this.state.userData.zipCode}
                className="input1"
              />

              <button className="btn1">Update</button>
            </form>
          </div>
        </div>
      </ProfileContainer>
    );
  }
}

export default ClientProfile;
