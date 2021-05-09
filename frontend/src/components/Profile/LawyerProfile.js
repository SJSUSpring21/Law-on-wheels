import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import profilepic from "../../images/lawyer-profile.jpg";
import Server from "../../webConfig";
import axios from "axios";
import swal from "sweetalert";
import "./LawyerProfile.css";
class LawyerProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lawyer_id: localStorage.getItem("user_id"),
			lawyerData: {},
			specOptions: [
				{ name: "Divorse", value: "divorse" },
				{ name: "Child Custody", value: "childcustody" },
				{ name: "Family", value: "family" },
				{ name: "Property", value: "property" },
				{ name: "Labour", value: "labour" },
				{ name: "Crime", value: "crime" },
				{ name: "Consumer", value: "consumer" },
				{ name: "Cyber", value: "cyber" },
				{ name: "Land disputes", value: "landdisputes" },
				{ name: "Civil", value: "civil" },
				{ name: "Immigration", value: "immigration" },
				{ name: "Banking", value: "banking" },
				{ name: "Sexual harassment", value: "sexualharassment" },
			],
			selectedSpecs: [],
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	onSelect = (data) => {
		this.setState({
			selectedSpecs: data,
		});
		//console.log("selected", this.state.selectedSpecs);
	};
	onSubmit = (e) => {
		e.preventDefault();

		const updatedData = {
			name: this.state.name,
			email: this.state.email,
			number: this.state.number,
			address: this.state.address,
			practicingCity: this.state.practicingCity,
			zipCode: this.state.zipCode,
			specializations: this.state.selectedSpecs,
			practicingCourt: this.state.practicingCourt,
			education: this.state.education,
			experience: this.state.experience,
			barCouncilNumber: this.state.barCouncilNumber,
			gender: this.state.gender,
			user_id: localStorage.getItem("user_id"),
		};

		console.log("this  Data: ", updatedData);
		axios.defaults.withCredentials = true;
		axios
			.post(`${Server}/lawyers/updatelawyer`, updatedData)
			.then((response) => {
				console.log("response data from update user is", response.data);
				if (response.status === 200) {
					swal("Success", "Updated Successfully!", "success");
				}
			})
			.catch((error) => {
				console.log("error:", error);
				swal("Oops!", "Update Failed", "error");
			});
	};

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
		console.log("lc lawyer", localStorage.getItem("user_id"));
		return (
			<div className="container rounded mt-5 mb-5 lawyer-profile">
				<div className="row">
					<div className="col-md-3 border-right">
						<div className="d-flex flex-column align-items-center text-center p-3 py-5">
							<img
								className="rounded-circle mt-5"
								width="150px"
								src={profilepic}
							/>
						</div>
					</div>
					<div className="col-md-5 border-right">
						<form onSubmit={this.onSubmit}>
							<div className="p-3 py-5">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4>
										<strong>Lawyer Profile Details</strong>
									</h4>
								</div>

								<div className="row mt-3">
									<div className="col-md-12">
										<label className="labels">Your Name</label>
										<input
											id="name"
											type="text"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.name}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Mobile Number</label>
										<input
											id="number"
											type="text"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.number}
											pattern="[1-9]{1}[0-9]{9}"
											title="Enter valid mobile number"
											required
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Email</label>
										<input
											id="email"
											type="email"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.email}
											pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
											title="Please enter valid email address"
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Gender</label>
										<select
											id="gender"
											name="gender"
											className="form-control"
											onChange={this.onChange}
											value={this.state.lawyerData.gender}
										>
											<option value="" selected disabled hidden>
												Select Gender
											</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
									</div>
									<div className="col-md-12">
										<label className="labels">Address</label>
										<input
											id="address"
											type="text"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.address}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Practicing City</label>
										<input
											id="practicingCity"
											type="text"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.practicingCity}
											placeholder="Type city (Eg: Mumbai)"
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Zip Code</label>
										<input
											id="zipCode"
											type="text"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.zipCode}
											pattern="[1-9][0-9]{5}"
											title="Enter valid zipcode"
										/>
									</div>

									<div className="col-md-12">
										<label className="labels">Specializations</label>
										<Multiselect
											options={this.state.specOptions} // Options to display in the dropdown
											selectedValues={this.state.lawyerData.specializations} // Preselected value to persist in dropdown
											onSelect={this.onSelect}
											displayValue="name"
											id="multiselect-custom"
											style={{ chips: { background: "#01bf71" } }}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Practicing Court</label>
										<input
											id="practicingCourt"
											type="text"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.practicingCourt}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Bar Council Number</label>
										<input
											id="barCouncilNumber"
											type="text"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.barCouncilNumber}
											required
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Education Details</label>
										<input
											type="text"
											id="education"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.education}
											required
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Experience (in Years)</label>
										<input
											id="experience"
											type="number"
											className="form-control"
											onChange={this.onChange}
											defaultValue={this.state.lawyerData.experience}
										/>
									</div>
								</div>

								<div className="mt-5 text-center">
									<button className="btn btn-primary" type="submit">
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

export default LawyerProfile;
