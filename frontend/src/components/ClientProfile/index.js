import React, { Component } from "react";
import Server from "../../webConfig";
import axios from "axios";
import swal from "sweetalert";
import "./ClientProfile.css";

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
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onImageChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileText: e.target.files[0].name,
        });
    };
    onSelect = (data) => {
        this.setState({
            selectedSpecs: data,
        });
    };

    onUpdate = (e) => {
        e.preventDefault();

        const profileData = {
            user_id: this.state.user_id,
            name: this.state.name,
            email: this.state.email,
            dob: this.state.dob,
            image: this.state.image,
            phoneNumber: this.state.phoneNumber,
            aadhar: this.state.aadhar,
            gender: this.state.gender,
            address: this.state.address,
            state: this.state.state,
            city: this.state.city,
            zipcode: this.state.zipcode,
        };
        console.log("profileData", profileData);

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

    onUpload = (e) => {
        console.log("inside upload");
        e.preventDefault();

        const formData = new FormData();

        formData.append("image", this.state.file);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        console.log("formData", formData);
        axios
            .post(
                `${Server}/images/uploads/${this.state.user_id}`,
                formData,
                uploadConfig
            )
            .then((response) => {
                alert("Image uploaded successfully!");
                this.setState({
                    fileText: "Choose file",
                    image: response.data,
                });
            })
            .catch((err) => {
                console.log("Error" + err);
            });
    };

    componentDidMount = () => {
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
    };

    render() {
        let imageSrc;
        if (this.state) {
            imageSrc = `${Server}/images/${this.state.userData.image}`;
        }
        return (
            <div className="container rounded mt-5 mb-5 client-profile">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-5"
                                width="150px"
                                src={imageSrc}
                                alt="profile_image"
                            />
                            <form onSubmit={this.onUpload}>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    name="image"
                                    accept="image/*"
                                    onChange={this.onImageChange}
                                    required
                                />
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Upload Image
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <form onSubmit={this.onUpdate}>
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4>
                                        <strong>User Profile Details</strong>
                                    </h4>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">
                                            Your Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.name
                                            }
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.email
                                            }
                                            pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                                            title="Please enter valid email address"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">
                                            Phone Number
                                        </label>
                                        <input
                                            id="number"
                                            name="phoneNumber"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.number
                                            }
                                            pattern="[1-9]{1}[0-9]{9}"
                                            title="Enter valid mobile number"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">
                                            Date Of Birth
                                        </label>
                                        <input
                                            id="dob"
                                            name="dob"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.dob
                                            }
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="labels">
                                            Aadhar Card Number
                                        </label>
                                        <input
                                            id="aadhar"
                                            name="aadhar"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.aadhar
                                            }
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Gender</label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.userData.gender}
                                        >
                                            <option
                                                value=""
                                                selected
                                                disabled
                                                hidden
                                            >
                                                Select Gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">
                                            Street Address
                                        </label>
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.address
                                            }
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">State</label>
                                        <input
                                            id="state"
                                            name="state"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.state
                                            }
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels"> City</label>
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.city
                                            }
                                            placeholder="Type city (Eg: Mumbai)"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">
                                            Zip Code
                                        </label>
                                        <input
                                            id="zipcode"
                                            name="zipcode"
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            defaultValue={
                                                this.state.userData.zipCode
                                            }
                                            pattern="[1-9][0-9]{5}"
                                            title="Enter valid zipcode"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 text-center">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientProfile;
