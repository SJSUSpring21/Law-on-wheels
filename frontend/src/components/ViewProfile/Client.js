import React, { Component } from "react";
import Server from "../../webConfig";
import axios from "axios";
import "./viewprofile.css";
import profilepic from "../../images/avatar.svg";

class Client extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: localStorage.getItem("user_id"),
			userData: {},
		};
	}

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
		return (
			<div className="container view-lawyer">
				<div className="row gutters">
					<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
						<div className="card h-100">
							<div className="card-body">
								<div className="account-settings">
									<div className="user-profile">
										<div className="user-avatar">
											<img src={profilepic} alt="clientProfile" />
										</div>
										<h5 className="user-name">{this.state.userData.name}</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
						<div className="card h-100">
							<div className="card-body">
								<div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h4 className="mb-2 text-primary">Client Details</h4>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="fullName">Full Name</label>
											<span className="form-control">
												{this.state.userData.name}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="eMail">Email</label>

											<span className="form-control">
												{this.state.userData.email}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="phone">Conatct Number</label>
											<span className="form-control">
												{this.state.userData.number}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="gender">Gender</label>
											<span className="form-control">
												{this.state.userData.gender}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="gender">Aadhar Number</label>
											<span className="form-control">
												{this.state.userData.aadhar}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="gender">Date of Birth</label>
											<span className="form-control">
												{this.state.userData.dob}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="gender">Address</label>
											<span className="form-control">
												{this.state.userData.address}
											</span>
										</div>
									</div>

									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="city">City</label>
											<span className="form-control">
												{this.state.userData.city}
											</span>
										</div>
									</div>

									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="state">State</label>
											<span className="form-control">
												{this.state.userData.state}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="zipCode">Zip Code</label>
											<span className="form-control">
												{this.state.userData.zipCode}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Client;
