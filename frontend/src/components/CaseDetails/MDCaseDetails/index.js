import React, { Component } from "react";
import axios from "axios";
import Server from "../../../webConfig";
import "../CaseDetails.css";
import swal from "sweetalert";
import { displayStatusUsingStatusCode } from "../../../helpers/utils";

export class MDCaseDetails extends Component {
  state = {
    caseDetails: null,
    nextStatuses: null,
  };

  changeStatus = async (status) => {
    console.log(status);
    const request = {
      case_id: localStorage.getItem("case_id"),
      type: localStorage.getItem("case_type"),
      newStatus: status,
    };
    // console.log(request);
    const newNextStatus = await axios.post(
      `${Server}/cases/status/change`,
      request,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (newNextStatus) {
      swal("Status Updated Successfully!", "success");
      const case_id = localStorage.getItem("case_id");
      const case_type = localStorage.getItem("case_type");
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
    }
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
    let accountT = "";
    let laywer_user_name = "";
    let lawyer_user_email = "";
    let nextStatuses = [];
    let act = localStorage.getItem("type");
    if (this.state && this.state.caseDetails) {
      const caseDetails = this.state.caseDetails;
      console.log("casD", caseDetails);

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
        for (let index = 0; index < this.state.nextStatuses.length; index++) {
          nextStatuses.push(
            <>
              <div
                class="w3-light-grey w3-round-xlarge w3-small ra-next-status"
                key={this.state.nextStatuses[index]}
                onClick={() => {
                  this.changeStatus(this.state.nextStatuses[index]);
                }}
              >
                <div
                  class="
                    w3-container w3-center w3-round-xlarge w3-teal ra-next-status-value
                "
                  style={{ width: "100%" }}
                >
                  {displayStatusUsingStatusCode(this.state.nextStatuses[index])}
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
        <div class="w3-content w3-margin-top" style={{ maxWidth: "1200px" }}>
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
                        ? displayStatusUsingStatusCode(
                            this.state.caseDetails.status
                          )
                        : "loading"}
                    </div>
                  </div>

                  <hr />

                  <p class="w3-large w3-text-theme">
                    <b>
                      {this.state.nextStatuses && act === "LAWYER"
                        ? "Next Statuses"
                        : ""}
                    </b>
                  </p>
                  {this.state.nextStatuses && act === "LAWYER"
                    ? nextStatuses
                    : ""}
                </div>
              </div>
              <br />
            </div>

            <div class="w3-twothird">
              <div class="w3-container w3-card w3-white w3-margin-bottom w3-margin-top">
                <h2 class="w3-text-grey w3-padding-16">
                  <i
                    class="
                                    fa fa-home fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                  ></i>
                  Marriage Details
                </h2>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Date</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.marriageDate.split("T")[0]
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Place</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.marriagePlace
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
                      ? this.state.caseDetails.marriageCity
                      : "loading"}
                  </h6>

                  <br />
                </div>
              </div>

              <div class="w3-container w3-card w3-white w3-margin-bottom">
                <h2 class="w3-text-grey w3-padding-16">
                  <i
                    class="
                                    fa fa-male fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                  ></i>
                  Husband Details
                </h2>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Name</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.nameOfHusband
                      : "loading"}
                  </h6>
                  <p></p>
                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Father's Name</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.nameOfFatherOfHusband
                      : "loading"}
                  </h6>
                  <hr />
                </div>

                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Date of Birth</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.husbandBirthday.split("T")[0]
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
                      ? this.state.caseDetails.husbandEmail
                      : "loading"}
                  </h6>
                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Contact</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.husbandContact
                      : "loading"}
                  </h6>
                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Religion</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.religionOfHusband
                      : "loading"}
                  </h6>
                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Residence before marriage</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.husbandPreResidence
                      : "loading"}
                  </h6>
                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Current Residence</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.husbandCurrentResidence
                      : "loading"}
                  </h6>
                  <br />
                </div>
              </div>
              <div class="w3-container w3-card w3-white w3-margin-bottom">
                <h2 class="w3-text-grey w3-padding-16">
                  <i
                    class="
                                    fa fa-female fa-fw
                                    w3-margin-right w3-xxlarge w3-text-teal
                                "
                  ></i>
                  Wife Details
                </h2>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Name</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.nameOfWife
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Father's Name</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.nameOfFatherOfWife
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Date of Birth</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.wifeBirthday.split("T")[0]
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
                      ? this.state.caseDetails.wifeEmail
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Contact</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.wifeContact
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Religion</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.religionOfWife
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Residence before marriage</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.wifePreResidence
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Current residence</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.wifeCurrentResidence
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
                  Other Details
                </h2>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>No. of Children</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.numberOfChildren
                      : "loading"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>
                      Need settlement regarding Maintenance/Alimony and Joint
                      Assets
                    </b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails &&
                    this.state.caseDetails.needSettlement
                      ? "YES"
                      : "NO"}
                  </h6>

                  <hr />
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                    <b>Residence after marriage</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    {this.state.caseDetails
                      ? this.state.caseDetails.residenceDuringMarriage
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

export default MDCaseDetails;
