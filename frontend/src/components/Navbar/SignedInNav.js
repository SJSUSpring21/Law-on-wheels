import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/loginActions";
import { FaBars } from "react-icons/fa";
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinksProfile,
    NavBtn,
    NavBtnLink,
} from "../Navbar/NavbarElements";

import "../../App.css";
class SignedInNav extends Component {
    render() {
        const { toggle } = this.props;
        const user = localStorage.getItem("name");
        return (
            <>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/">Law On Wheels</NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars></FaBars>
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinksProfile
                                    to="/profile"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={0}
                                >
                                    {user}
                                </NavLinksProfile>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink onClick={this.props.signOut}>
                                Logout
                            </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user.name,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInNav);
