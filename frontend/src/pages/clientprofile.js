import React, { Component } from "react";
import ClientProfile from "../components/ClientProfile";
import SignedInNav from "../components/Navbar/SignedInNav";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ClientProfilePage extends Component {
    render() {
        const { loggedIn } = this.props;
        if (!loggedIn) return <Redirect to="/" />;
        return (
            <>
                <SignedInNav />
                <ClientProfile />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(ClientProfilePage);
