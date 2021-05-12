import React, { Component } from "react";
import axios from "axios";
import Server from "../../../webConfig";
// import Token from "../../bearerToken";
import avatar1 from "../../../images/caseProfile.jpeg";
// import LawyerCenter from "../Center/LawyerCenter";

export class RACaseDetails extends Component {
    state = {
        caseDetails: null,
        nextStatuses: null,
    };

    componentDidMount = () => {
        const case_id = localStorage.getItem("case_id");
        const case_type = localStorage.getItem("case_type");

        axios.defaults.withCredentials = true;
        axios
            .get(`${Server}/cases/details/${case_id}?type=${case_type}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response.data);
                const data = JSON.stringify(response.data);
                const data1 = JSON.parse(data);

                this.setState({
                    caseDetails: data1,
                });
            })
            .catch((error) => {
                console.log("Error: " + error);
            });

        axios
            .get(`${Server}/cases/status/next/${case_id}?type=${case_type}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                const nextStatuses = response.data.nextStatuses;
                console.log(nextStatuses);
                this.setState({
                    nextStatuses: nextStatuses,
                });
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    };
    render() {
        let user;
        let accountT = "";
        let laywer_user_name = "";
        let lawyer_user_email = "";
        let nextStatuses = [];
        if (this.state && this.state.caseDetails) {
            const caseDetails = this.state.caseDetails;
            console.log("casD", caseDetails);
            user = this.state.caseDetails.user.email;
            if (localStorage.getItem("type") === "LAWYER") {
                accountT = "Client";
                laywer_user_name = this.state.caseDetails.user.name;
                lawyer_user_email = this.state.caseDetails.user.email;
            } else if (localStorage.getItem("type") === "USER") {
                accountT = "Lawyer";
                laywer_user_name = this.state.caseDetails.lawyer.name;
                lawyer_user_email = this.state.caseDetails.lawyer.email;
            }

            if (this.state.nextStatuses) {
                for (
                    let index = 0;
                    index < this.state.nextStatuses.length;
                    index++
                ) {
                    nextStatuses.push(
                        <>
                            <div
                                class="w3-light-grey w3-round-xlarge w3-small ra-next-status"
                                key={this.state.nextStatuses[index]}
                            >
                                <div
                                    class="
                    w3-container w3-center w3-round-xlarge w3-teal ra-next-status-value
                "
                                    style={{ width: "100%" }}
                                >
                                    {this.state.nextStatuses[index]}
                                </div>
                            </div>
                            <br />
                        </>
                    );
                }
            }
        }
        return (
            <div class="w3-light-grey cdra-body">
                <div
                    class="w3-content w3-margin-top"
                    style={{ maxWidth: "1200px" }}
                >
                    <div class="w3-row-padding">
                        <div class="w3-third">
                            <div class="w3-white w3-text-grey w3-card-4">
                                <h2 class="w3-text-grey w3-padding-16">
                                    <i
                                        class="
                            fa fa-user fa-fw
                            w3-margin-right w3-xxlarge w3-text-teal
                        "
                                    ></i>
                                    {accountT} Details
                                </h2>
                                <div class="w3-container">
                                    <div>
                                        <p>
                                            <i
                                                class="
                                fa fa-user fa-fw
                                w3-margin-right w3-large w3-text-teal
                            "
                                            ></i>
                                            {laywer_user_name}
                                        </p>

                                        <p>
                                            <i
                                                class="
                                fa fa-envelope fa-fw
                                w3-margin-right w3-large w3-text-teal
                            "
                                            ></i>
                                            {lawyer_user_email}
                                        </p>
                                    </div>

                                    <hr />

                                    <p class="w3-large">
                                        <b>
                                            <i
                                                class="
                                            fa fa-asterisk fa-fw
                                            w3-margin-right w3-text-teal
                                        "
                                            ></i>
                                            Current Status of Case
                                        </b>
                                    </p>

                                    <div class="w3-light-grey w3-round-xlarge w3-small">
                                        <div
                                            class="
                                        w3-container w3-center w3-round-xlarge w3-teal ra-next-status-value
                                    "
                                            style={{ width: "100%" }}
                                        >
                                            {this.state.caseDetails
                                                ? this.state.caseDetails.status
                                                : "loading"}
                                        </div>
                                    </div>

                                    <hr />

                                    <p class="w3-large w3-text-theme">
                                        <b>
                                            <i
                                                class="
                                            fa fa-sign-out fa-fw
                                            w3-margin-right w3-text-teal
                                        "
                                            ></i>
                                            Next Statuses
                                        </b>
                                    </p>
                                    {this.state.nextStatuses
                                        ? nextStatuses
                                        : "loading"}
                                    <br />
                                </div>
                            </div>
                            <br />
                        </div>

                        <div class="w3-twothird">
                            <div class="w3-container w3-card w3-white w3-margin-bottom w3-margin-top">
                                <h2 class="w3-text-grey w3-padding-16">
                                    <i
                                        class="
                                    fa fa-suitcase fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                                    ></i>
                                    Tenant Details
                                </h2>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Name</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails.tenants[0]
                                                  .name
                                            : "loading"}
                                    </h6>

                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Parent's Name</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails.tenants[0]
                                                  .parentName
                                            : "loading"}
                                    </h6>

                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Email</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails.tenants[0]
                                                  .email
                                            : "loading"}
                                    </h6>

                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Current Address</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails.tenants[0]
                                                  .address
                                            : "loading"}
                                    </h6>

                                    <br />
                                </div>
                            </div>

                            <div class="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 class="w3-text-grey w3-padding-16">
                                    <i
                                        class="
                                    fa fa-home fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                                    ></i>
                                    Property Details
                                </h2>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Property Number</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .propertyNumber
                                            : "loading"}
                                    </h6>
                                    <p></p>
                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>State</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .propertyState
                                            : "loading"}
                                    </h6>
                                    <hr />
                                </div>

                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>City</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .propertyCity
                                            : "loading"}
                                    </h6>
                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Address</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .propertyAddress
                                            : "loading"}
                                    </h6>
                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Locality</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .propertyLocality
                                            : "loading"}
                                    </h6>
                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Zip Code</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .propertyZipCode
                                            : "loading"}
                                    </h6>
                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Floor Number</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .propertyFloor
                                            : "loading"}
                                    </h6>
                                    <br />
                                </div>
                            </div>
                            <div class="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 class="w3-text-grey w3-padding-16">
                                    <i
                                        class="
                                    fa fa-handshake fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                                    ></i>
                                    Agreement Details
                                </h2>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Agreement Start Date</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails.agreementStartDate.split(
                                                  "T"
                                              )[0]
                                            : "loading"}
                                    </h6>

                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Monthly Rent (₹)</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails.monthlyRent
                                            : "loading"}
                                    </h6>

                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Notice Period (in Months)</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .noticePeriod
                                            : "loading"}
                                    </h6>

                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Rent Payment Date (every month)</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .rentPaymentDate
                                            : "loading"}
                                    </h6>

                                    <hr />
                                </div>
                                <div class="w3-container">
                                    <h5 class="w3-opacity">
                                        <b>Security Amount (₹)</b>
                                    </h5>
                                    <h6 class="w3-text-teal">
                                        {this.state.caseDetails
                                            ? this.state.caseDetails
                                                  .securityAmount
                                            : "loading"}
                                    </h6>

                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RACaseDetails;
