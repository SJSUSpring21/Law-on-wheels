import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignedInSidebar from "../components/Sidebar/signedInSidebar";
import Client from "../components/ViewProfile/Client";
import Lawyer from "../components/ViewProfile/Lawyer";
import MainNavbar from "../components/MainNavbar";
class ViewProfile extends Component {
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
			profile = <Client />;
		} else if (type === "LAWYER") {
			profile = <Lawyer />;
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

export default connect(mapStateToProps, null)(ViewProfile);
