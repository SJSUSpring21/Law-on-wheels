import React from "react";
import photo from "../../images/6.svg";
import "./Signup.css";

const SignUp = () => {
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
                    <form action="" className="signup-form">
                        <div className="form-control">
                            <input type="text" placeholder="Username" />
                            <i class="fas fa-user"></i>
                        </div>
                        <div className="form-control">
                            <input type="email" placeholder="Email" />
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="form-control">
                            <input type="password" placeholder="Password" />
                            <i class="fas fa-lock"></i>
                        </div>{" "}
                        <div class="radio-signup">
                            <input
                                class="radio__input_signup"
                                value="Client"
                                type="radio"
                                name="radio"
                                id="myRadio1"
                            />
                            <label class="radio__label_signup" for="myRadio1">
                                Client
                            </label>
                            <input
                                class="radio__input_signup"
                                value="Lawyer"
                                type="radio"
                                name="radio"
                                id="myRadio2"
                            />
                            <label class="radio__label_signup" for="myRadio2">
                                Lawyer
                            </label>
                        </div>{" "}
                        <button class="submit">Sign Up</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default SignUp;
