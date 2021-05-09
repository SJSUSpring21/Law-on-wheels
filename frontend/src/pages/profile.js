import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignedInSidebar from "../components/Sidebar/signedInSidebar";
import ClientProfile from "../components/ClientProfile";
import LawyerProfile from "../components/Profile/LawyerProfile";
import MainNavbar from "../components/MainNavbar";
class Profile extends Component {
	state = {
		isOpen: false,
	};
	handleToggle = () => {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};
	render() {
		const { loggedIn } = this.props;
		if (!loggedIn) return <Redirect to="/" />;
		const type = localStorage.getItem("type");
		let profile;
		if (type === "USER") {
			profile = <ClientProfile />;
		} else if (type === "LAWYER") {
			profile = <LawyerProfile />;
		}
		return (
			<>
				<SignedInSidebar
					isOpen={this.state.isOpen}
					toggle={this.handleToggle}
				/>

				<MainNavbar toggle={this.handleToggle} />

				{profile}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.auth.loggedIn,
	};
};

export default connect(mapStateToProps, null)(Profile);
