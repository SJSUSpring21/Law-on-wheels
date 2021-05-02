import React, { Component } from "react";
import photo from "../../images/6.svg";
import "./Signup.css";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/loginActions";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

class SignUp extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        accountType: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.accountType === "") {
            swal(
                "Oops!",
                "Please select one of the two account types",
                "error"
            );
        } else {
            this.props.signUp(this.state);
        }
    };

    render() {
        const { authError } = this.props;
        const { loggedIn } = this.props;
        const { user } = this.props;

        if (loggedIn) {
            const accountType = user.type;
            localStorage.setItem("user_id", user._id);
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);
            localStorage.setItem("token", user.token);
            localStorage.setItem("type", user.type);
            if (accountType === "LAWYER") {
                localStorage.setItem("isApproved", user.isApproved);
                return <Redirect to="/center" />;
            } else if (accountType === "USER") {
                return <Redirect to="/center" />;
            }
        }

        return (
            <div id="signup" style={{ paddingTop: "60px" }}>
                <section className="leftside">
                    <img src={photo} alt="" />
                </section>
                <section className="main">
                    <div className="signup-container">
                        <p className="title">Welcome</p>
                        <div className="separator"></div>
                        <p class="welcome-message">Please enter details</p>
                        <form
                            action=""
                            className="signup-form"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    id="name"
                                    name="name"
                                    onChange={this.handleChange}
                                    required
                                />
                                <i class="fas fa-user"></i>
                            </div>
                            <div className="form-control">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    required
                                />
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="form-control">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    required
                                />
                                <i class="fas fa-lock"></i>
                            </div>{" "}
                            <div class="radio-signup">
                                <input
                                    class="radio__input_signup"
                                    value="Client"
                                    type="radio"
                                    name="accountType"
                                    id="myRadio1"
                                    onChange={this.handleChange}
                                />
                                <label
                                    class="radio__label_signup"
                                    for="myRadio1"
                                >
                                    Client
                                </label>
                                <input
                                    class="radio__input_signup"
                                    value="Lawyer"
                                    type="radio"
                                    name="accountType"
                                    id="myRadio2"
                                    onChange={this.handleChange}
                                />
                                <label
                                    class="radio__label_signup"
                                    for="myRadio2"
                                >
                                    Lawyer
                                </label>
                            </div>{" "}
                            <button class="submit">Sign Up</button>
                            <div>
                                {authError ? (
                                    <p className="logInError">{authError}</p>
                                ) : null}
                                {loggedIn ? <p>LoggedIn</p> : null}
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newAccount) => dispatch(signUp(newAccount)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
