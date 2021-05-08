import React, { Component } from "react";

export class PropertyDetails extends Component {
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
                            <h2 className="ra-h2">Property Details</h2>
                        </section>
                        <div className="input-container">
                            <label className="ra-label" htmlFor="floor">
                                Floor No.
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="floor"
                                name="floor"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label className="ra-label" htmlFor="bhk">
                                Choose BHK
                            </label>

                            <select
                                name="bhk"
                                id="bhk"
                                className="ra-input"
                                onChange={handleChange}
                                required
                            >
                                <option value="1RK">1 RK</option>
                                <option value="1BHK">1 BHK</option>
                                <option value="1.5BHK">1.5BHK</option>
                                <option value="2BHK">2 BHK</option>
                                <option value="2.5BHK">2.5 BHK</option>
                                <option value="3BHK">3 BHK</option>
                                <option value="3.5BHK">3.5 BHK</option>
                                <option value="4BHK">4 BHK</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label className="ra-label" htmlFor="house_number">
                                House No.
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="house_number"
                                name="house_number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="property_address"
                            >
                                Property Address
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="property_address"
                                name="property_address"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="property_locality"
                            >
                                Locality
                            </label>
                            <input
                                className="ra-input"
                                type="text"
                                id="property_locality"
                                name="property_locality"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label
                                className="ra-label"
                                htmlFor="property_pincode"
                            >
                                Pincode
                            </label>
                            <input
                                className="ra-input"
                                type="number"
                                id="property_pincode"
                                name="property_pincode"
                                onChange={handleChange}
                                required
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

export default PropertyDetails;
