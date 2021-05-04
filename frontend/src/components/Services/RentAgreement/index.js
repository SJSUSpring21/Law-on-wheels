import React, { Component } from "react";
import ContractDetails from "./ContractDetails";
import LandlordDetails from "./LandlordDetails";
import PropertyDetails from "./PropertyDetails";
import TenantDetails from "./TenantDetails";

export class RentAgreement extends Component {
    state = {
        step: 1,
        landlord_fullname: "",
        landlord_number: "",
        landlord_email: "",
        landlord_state: "",
        landlord_city: "",
        landlord_stamp: "",
        tenant_fullname: "",
        tenant_parentname: "",
        tenant_number: "",
        tenant_email: "",
        tenant_address: "",
        floor: "",
        bhk: "",
        house_number: "",
        property_address: "",
        property_locality: "",
        property_pincode: "",
        agreement_start_date: "",
        monthly_rent: "",
        security_amount: "",
        notice_period: "",
        rent_increment_percent: "",
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1,
        });
    };

    previousStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1,
        });
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        const { step } = this.state;
        const { fullname, number, email, state, city, stamp } = this.state;
        const values = { fullname, number, email, state, city, stamp };

        switch (step) {
            case 1:
                return (
                    <LandlordDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <TenantDetails
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <PropertyDetails
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 4:
                return (
                    <ContractDetails
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        values={values}
                    />
                );
            default:
                return (
                    <LandlordDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
        }
    }
}

export default RentAgreement;
