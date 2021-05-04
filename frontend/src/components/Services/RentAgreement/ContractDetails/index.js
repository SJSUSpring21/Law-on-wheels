import React, { Component } from "react";

export class ContractDetails extends Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    previous = (e) => {
        e.preventDefault();
        this.props.previousStep();
    };

    render() {
        const { values, handleChange, handleSubmit } = this.props;
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
                            <h2 className="ra-h2">Contract Details</h2>
                        </section>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="agreement_start_date"
                            >
                                Agreement Start Date
                            </label>
                            <input
                                className="ra-input"
                                type="Date"
                                id="agreement_start_date"
                                name="agreement_start_date"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-container">
                            <label className="ra-label" htmlFor="monthly_rent">
                                Monthly Rent (in ₹)
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="monthly_rent"
                                name="monthly_rent"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="security_amount"
                            >
                                Security Amount
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="security_amount"
                                name="security_amount"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-container">
                            <label className="ra-label" htmlFor="notice_period">
                                Notice period (in months)
                            </label>

                            <select
                                name="notice_period"
                                id="notice_period"
                                className="ra-input"
                                onChange={handleChange}
                                defaultValue="1"
                            >
                                <option value="1">1 month</option>
                                <option value="2">2 months</option>
                                <option value="3">3 months</option>
                            </select>
                        </div>

                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="rent_increment_percent"
                            >
                                Rent Increment (in %)
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="rent_increment_percent"
                                name="rent_increment_percent"
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
                            <button className="next-btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContractDetails;
