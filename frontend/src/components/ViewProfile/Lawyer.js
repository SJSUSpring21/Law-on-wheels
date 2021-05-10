import React, { Component } from "react";
import Server from "../../webConfig";
import axios from "axios";
import "./viewprofile.css";
import profilepic from "../../images/lawyer-profile.jpg";

class Lawyer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lawyer_id: localStorage.getItem("user_id"),
			lawyerData: {},
		};
	}

	componentDidMount() {
		axios.defaults.withCredentials = true;
		axios
			.post(`${Server}/lawyers/getlawyer/${localStorage.getItem("user_id")}`)
			.then((response) => {
				console.log("response data from get user is", response.data);
				this.setState({
					lawyerData: response.data,
				});
			})
			.catch((error) => {
				console.log("error:", error);
			});
	}
	render() {
		let spec = this.state.lawyerData.specializations;
		let specNames =
			spec && spec.length > 0
				? Array.prototype.map.call(spec, (s) => s.name).toString()
				: "none";
		console.log("specNames: ", specNames);
		console.log(
			"this.state.lawyerData.isApprovedByAdmin",
			this.state.lawyerData.isApprovedByAdmin
		);
		return (
			<div className="container view-lawyer">
				<div className="row gutters">
					<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
						<div className="card h-100">
							<div className="card-body">
								<div className="account-settings">
									<div className="user-profile">
										<div className="user-avatar">
											<img src={profilepic} alt="lawyerProfile" />
										</div>
										<h6>{"Lawyer"}</h6>
										<h5 className="user-name">{this.state.lawyerData.name}</h5>

										{this.state.lawyerData.isApprovedByAdmin === false ? (
											<h6 className="text-danger">Verification Pending</h6>
										) : (
											<h6 className="text-success">Verified Profile</h6>
										)}
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
										<h4 className="mb-2 text-primary">Personal Details</h4>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="fullName">Full Name</label>
											<span className="form-control">
												{this.state.lawyerData.name}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="eMail">Email</label>

											<span className="form-control">
												{this.state.lawyerData.email}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="phone">Conatct Number</label>
											<span className="form-control">
												{this.state.lawyerData.number}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="gender">Gender</label>
											<span className="form-control">
												{this.state.lawyerData.gender}
											</span>
										</div>
									</div>
								</div>
								<div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h4 className="mt-3 mb-2 text-primary">
											Professional Details
										</h4>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="education">Education</label>
											<span className="form-control">
												{this.state.lawyerData.education}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="experience">
												Experience (Number Of Years)
											</label>
											<span className="form-control">
												{this.state.lawyerData.experience}
											</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="sTate">Specializations</label>
											<span className="form-control">{specNames}</span>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="zIp">Practicing City</label>
											<span className="form-control">
												{this.state.lawyerData.practicingCity}
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

export default Lawyer;
