import React, { Component } from "react";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import AppBar from "@material-ui/core/AppBar";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import "../RentAgreement.css";

export class LandlordDetails extends Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };
    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="split-screen">
                <div className="ra-left">
                    <section className="copy">
                        <h1 className="ra-h1">Rent Agreement</h1>
                    </section>
                </div>
                <div className="ra-right">
                    <div className="ra-form">
                        <section className="copy">
                            <h2 className="ra-h2">Landlord Details</h2>
                        </section>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="landlord_fullname"
                            >
                                Full Name
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="landlord_fullname"
                                name="landlord_fullname"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="landlord_number"
                            >
                                Phone Number
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="landlord_number"
                                name="landlord_number"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="landlord_email"
                            >
                                Email
                            </label>
                            <input
                                className="ra-input"
                                type="email"
                                id="landlord_email"
                                name="landlord_email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="landlord_state"
                            >
                                State
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="landlord_state"
                                name="landlord_state"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label className="ra-label" htmlFor="landlord_city">
                                City
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="landlord_city"
                                name="landlord_city"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="landlord_stamp"
                            >
                                Stamp
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="landlord_stamp"
                                name="landlord_stamp"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="ra-btn-container">
                            <button className="next-btn" onClick={this.next}>
                                Next <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandlordDetails;
