import React from "react";
import bg from "../../images/wave.png";
import judge from "../../images/judge-black.svg";
import profile from "../../images/avatar-black.svg";
import "./Signin.css";
import { Link } from "react-router-dom";
const SignIn = () => {
    return (
        <div id="signin">
            <div className="name">
                <Link className="home" to="/">
                    Law on Wheels
                </Link>
            </div>
            <img src={bg} alt="wavebackground" className="wave" />
            <div className="main-container">
                <div className="img">
                    <img src={judge} alt="avatar" />
                </div>
                <div className="login-form">
                    <form action="">
                        <img src={profile} alt="" />
                        <h2>Welcome Back</h2>
                        <div className="input-div username">
                            <div className="i">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="input-div password">
                            <div className="i">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div class="radio">
                            <input
                                class="radio__input"
                                value="Client"
                                type="radio"
                                name="radio"
                                id="myRadio1"
                            />
                            <label class="radio__label" htmlFor="myRadio1">
                                Client
                            </label>
                            <input
                                class="radio__input"
                                value="Lawyer"
                                type="radio"
                                name="radio"
                                id="myRadio2"
                            />
                            <label class="radio__label" htmlFor="myRadio2">
                                Lawyer
                            </label>
                        </div>
                        <input type="submit" className="btn" value="Login" />
                        <div>or</div>
                        <Link className="register" to="/">
                            Register
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
