import React, { Component } from "react";

export class PreviewRA extends Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    previous = (e) => {
        e.preventDefault();
        this.props.previousStep();
    };

    render() {
        const { values, handleChange, handleSubmit, getState } = this.props;
        const state = getState();
        console.log(state);
        const {
            landlord_fullname,
            landlord_number,
            landlord_email,
            landlord_state,
            landlord_city,
            landlord_stamp,
            tenant_fullname,
            tenant_parentname,
            tenant_number,
            tenant_email,
            tenant_address,
            floor,
            bhk,
            house_number,
            property_address,
            property_locality,
            property_pincode,
            agreement_start_date,
            monthly_rent,
            security_amount,
            notice_period,
            rent_increment_percent,
        } = state;
        return (
            <>
                <div className="ra-preview">
                    <div className="ra-window">{landlord_fullname}</div>
                    <div className="ra-btn-container">
                        <button className="next-btn" onClick={this.previous}>
                            Print
                        </button>
                        <button className="next-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default PreviewRA;
