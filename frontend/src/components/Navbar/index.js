import React from "react";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
    const toggleHome = () => {
        scroll.scrollToTop();
    };
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/" onClick={toggleHome}>
                        Law On Wheels
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars></FaBars>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks
                                to="services"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={0}
                            >
                                Services
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks
                                to="signup"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={0}
                            >
                                Sign Up
                            </NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/signin">Sign In</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    );
};

export default Navbar;
