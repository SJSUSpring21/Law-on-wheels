import React, { Component } from "react";
import MainNavbar from "../components/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignedInSidebar from "../components/Sidebar/signedInSidebar";
import ClientCenter from "../components/Center/ClientCenter";
import LawyerCenter from "../components/Center/LawyerCenter";

class Center extends Component {
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
        const isApproved = localStorage.getItem("isApproved");
        let center;
        if (type === "USER") {
            center = <ClientCenter />;
        } else if (type === "LAWYER" && isApproved === "true") {
            center = <LawyerCenter />;
        } else if (type === "LAWYER" && isApproved === "false") {
            return <Redirect to="/profile" />;
        }

        return (
            <>
                <SignedInSidebar
                    isOpen={this.state.isOpen}
                    toggle={this.handleToggle}
                />

                <MainNavbar toggle={this.handleToggle} />

                {center}
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(Center);
