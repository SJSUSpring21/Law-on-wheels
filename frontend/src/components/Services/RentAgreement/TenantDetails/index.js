import React, { Component } from "react";
import "../RentAgreement.css";

export class TenantDetails extends Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    previous = (e) => {
        e.preventDefault();
        this.props.previousStep();
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
                            <h2 className="ra-h2">Tenant Details</h2>
                        </section>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="tenant_fullname"
                            >
                                Full Name
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="tenant_fullname"
                                name="tenant_fullname"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="tenant_parentname"
                            >
                                Father / Mother's Name
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="tenant_parentname"
                                name="tenant_parentname"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label className="ra-label" htmlFor="tenant_number">
                                Phone Number
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="tenant_number"
                                name="tenant_number"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label className="ra-label" htmlFor="tenant_email">
                                Email
                            </label>
                            <input
                                className="ra-input"
                                type="email"
                                id="tenant_email"
                                name="tenant_email"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="tenant_address"
                            >
                                Permanent Address
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="tenant_address"
                                name="tenant_address"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="ra-btn-container">
                            <button
                                className="next-btn"
                                onClick={this.previous}
                            >
                                <i class="fas fa-arrow-left"></i> Previous
                            </button>
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

export default TenantDetails;
