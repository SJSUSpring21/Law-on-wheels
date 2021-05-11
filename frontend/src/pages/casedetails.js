import React, { Component } from "react";
import MainNavbar from "../components/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignedInSidebar from "../components/Sidebar/signedInSidebar";
import ClientCenter from "../components/Center/ClientCenter";
import LawyerCenter from "../components/Center/LawyerCenter";
import Casedetail from "../components/CaseDetails";

class CaseDetails extends Component {
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
        // const type = localStorage.getItem("type");
        // let center;
        // if (type === "USER") {
        //     center = <ClientCenter />;
        // } else if (type === "LAWYER") {
        //     center = <LawyerCenter />;
        // }

        return (
            <>
                <SignedInSidebar
                    isOpen={this.state.isOpen}
                    toggle={this.handleToggle}
                />

                <MainNavbar toggle={this.handleToggle} />

                <Casedetail />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(CaseDetails);
