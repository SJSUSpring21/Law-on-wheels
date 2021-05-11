import React, { Component } from "react";
import avatar from "../../images/avatar.svg";
import avatar1 from "../../images/avatar-black.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Server from "../../webConfig";
import Token from "../../bearerToken";
class LawyerCenter extends Component {
    state = {};

    componentWillMount = async () => {
        axios.defaults.withCredentials = true;
        // let dashboard = await axios.get(`${Server}/lawyers/dashboard`, Token);
        // console.log(dashboard.data.ongoingRentalAgreementCases);
        axios
            .get(`${Server}/lawyers/dashboard`, Token)
            .then((response) => {
                console.log(response.data);
                const data = JSON.stringify(response.data);
                const data1 = JSON.parse(data);

                this.setState({
                    dashboard: data1,
                });
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
        // const dashboard1 = JSON.stringify(dashboard)
    };
    render() {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        const populatedOngoingRentalAgreementCases = [];
        const populatedOngoingMutualDivorceCases = [];

        if (this.state && this.state.dashboard) {
            const ongoingRentalAgreementCases =
                this.state.dashboard.ongoingRentalAgreementCases;

            for (
                let index = 0;
                index < ongoingRentalAgreementCases.length;
                index++
            ) {
                const caseLink =
                    "/case/" + ongoingRentalAgreementCases[index]._id;
                populatedOngoingRentalAgreementCases.push(
                    <div class="w3-container w3-card w3-white w3-round w3-margin">
                        <Link
                            to={caseLink}
                            onClick={() => {
                                localStorage.setItem(
                                    "case_id",
                                    ongoingRentalAgreementCases[index]._id
                                );
                            }}
                        >
                            <br />
                            <img
                                src={avatar}
                                alt="Avatar"
                                class="w3-left w3-circle w3-margin-right"
                                style={{ width: "60px" }}
                            />
                            <span class="w3-right w3-opacity">
                                {ongoingRentalAgreementCases[index].type}
                            </span>
                            <h4>
                                {ongoingRentalAgreementCases[index].user.name}
                            </h4>
                            <br />
                            <hr class="w3-clear" />
                            <p>{ongoingRentalAgreementCases[index].status}</p>
                        </Link>
                    </div>
                );
            }

            const ongoingMutualDivorceCases =
                this.state.dashboard.ongoingMutualDivorceCases;
            for (
                let index = 0;
                index < ongoingMutualDivorceCases.length;
                index++
            ) {
                populatedOngoingMutualDivorceCases.push(
                    <div class="w3-container w3-card w3-white w3-round w3-margin">
                        <br />
                        <img
                            src={avatar}
                            alt="Avatar"
                            class="w3-left w3-circle w3-margin-right"
                            style={{ width: "60px" }}
                        />
                        <span class="w3-right w3-opacity">
                            {ongoingMutualDivorceCases[index].type}
                        </span>
                        <h4>{ongoingMutualDivorceCases[index].user.name}</h4>
                        <br />
                        <hr class="w3-clear" />
                        <p>{ongoingMutualDivorceCases[index].status}</p>
                    </div>
                );
            }
        }

        return (
            <>
                <div
                    class="w3-container w3-content"
                    style={{
                        maxWidth: "1400px",
                        paddingTop: "20px",
                        background: "#555",
                    }}
                >
                    <div class="w3-row">
                        <div class="w3-col m3">
                            <div
                                class="w3-card w3-round w3-white"
                                to="/profile"
                            >
                                <Link to="/profile">
                                    <div class="w3-container">
                                        <h4 class="w3-center">My Profile</h4>
                                        <p class="w3-center">
                                            <img
                                                src={avatar1}
                                                class="w3-circle"
                                                style={{
                                                    height: "106px",
                                                    width: "106px",
                                                }}
                                                alt="Avatar"
                                            />
                                        </p>
                                        <hr />
                                        <p>
                                            <i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>
                                            {name}
                                        </p>
                                        <p>
                                            <i class="fa fa-envelope fa-fw w3-margin-right w3-text-theme"></i>
                                            {email}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <br />
                        </div>

                        <div class="w3-col m7">
                            {populatedOngoingRentalAgreementCases}
                            {populatedOngoingMutualDivorceCases}
                            <div class="w3-container w3-card w3-white w3-round w3-margin">
                                <br />
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    class="w3-left w3-circle w3-margin-right"
                                    style={{ width: "60px" }}
                                />
                                <span class="w3-right w3-opacity">16 min</span>
                                <h4>Jane Doe</h4>
                                <br />
                                <hr class="w3-clear" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>
                            <div class="w3-container w3-card w3-white w3-round w3-margin">
                                <br />
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    class="w3-left w3-circle w3-margin-right"
                                    style={{ width: "60px" }}
                                />
                                <span class="w3-right w3-opacity">32 min</span>
                                <h4>Angie Jane</h4>
                                <br />
                                <hr class="w3-clear" />
                                <p>Have you seen this?</p>
                                <img
                                    src="/w3images/nature.jpg"
                                    style={{ width: "100%" }}
                                    class="w3-margin-bottom"
                                    alt=""
                                />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>
                        </div>

                        <div class="w3-col m2">
                            <div class="w3-card w3-round w3-white w3-center">
                                <div class="w3-container">
                                    <p>Upcoming Events:</p>
                                    <img
                                        src="/w3images/forest.jpg"
                                        alt="Forest"
                                        style={{ width: "100%" }}
                                    />
                                    <p>
                                        <strong>Holiday</strong>
                                    </p>
                                    <p>Friday 15:00</p>
                                    <p>
                                        <button class="w3-button w3-block w3-theme-l4">
                                            Info
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LawyerCenter;
