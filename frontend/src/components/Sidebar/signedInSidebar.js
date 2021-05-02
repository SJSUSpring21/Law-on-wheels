import React, { Component } from "react";
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLinkProfile,
    SideBtnWrap,
    SidebarRoute,
} from "./SidebarElements";
import { signOut } from "../../store/actions/loginActions";
import { connect } from "react-redux";

class SignedInSidebar extends Component {
    render() {
        const { isOpen } = this.props;
        const { toggle } = this.props;
        const user = localStorage.getItem("name");
        return (
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon>
                    <CloseIcon />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        <SidebarLinkProfile to="/profile" onClick={toggle}>
                            {user}
                        </SidebarLinkProfile>
                    </SidebarMenu>
                    <SideBtnWrap>
                        <SidebarRoute onClick={this.props.signOut}>
                            Logout
                        </SidebarRoute>
                    </SideBtnWrap>
                </SidebarWrapper>
            </SidebarContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignedInSidebar);
