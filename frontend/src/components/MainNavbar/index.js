import React, { Component } from "react";
import "../../App.css";
import SignedInNav from "../Navbar/SignedInNav";
import { connect } from "react-redux";
import Navbar from "../Navbar";

class MainNavbar extends Component {
    state = {};
    render() {
        const { loggedIn } = this.props;
        const { toggle } = this.props;
        const links = loggedIn ? (
            <SignedInNav toggle={toggle} />
        ) : (
            <Navbar toggle={toggle} />
        );
        return <> {links} </>;
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps)(MainNavbar);
