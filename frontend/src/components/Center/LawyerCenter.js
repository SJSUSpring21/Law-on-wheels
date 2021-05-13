import React, { Component } from "react";
import avatar from "../../images/avatar.svg";
import avatar1 from "../../images/avatar-black.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Server from "../../webConfig";
import Token from "../../bearerToken";
import "./Center.css";
import { displayStatusUsingStatusCode } from "../../helpers/utils";
class LawyerCenter extends Component {
    state = {};

    componentWillMount = async () => {
        axios.defaults.withCredentials = true;

        axios
            .get(`${Server}/lawyers/dashboard`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
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
        let activeCases;
        let completedCases;
        let rejectedCases;

        const populatedOngoingRentalAgreementCases = [];
        const populatedOngoingMutualDivorceCases = [];
        const populatedcompletedMutualDivorceCases = [];
        const populatedcompletedRentalAgreementCases = [];
        const populatedrejectedRentalAgreementCases = [];
        const populatedrejectedMutualDivorceCases = [];

        if (this.state && this.state.dashboard) {
            if (this.state.dashboard.ongoingRentalAgreementCases) {
                //Active Rental Cases
                const ongoingRentalAgreementCases =
                    this.state.dashboard.ongoingRentalAgreementCases;
                for (
                    let index = 0;
                    index < ongoingRentalAgreementCases.length;
                    index++
                ) {
                    const caseLink =
                        "/case/rentagreement/" +
                        ongoingRentalAgreementCases[index]._id;
                    const chatLink =
                        "/chat?room=" + ongoingRentalAgreementCases[index]._id;
                    populatedOngoingRentalAgreementCases.push(
                        <div class="w3-container w3-card w3-white w3-round w3-margin">
                            <br />
                            <Link
                                to={caseLink}
                                onClick={() => {
                                    localStorage.setItem(
                                        "case_id",
                                        ongoingRentalAgreementCases[index]._id
                                    );
                                    localStorage.setItem(
                                        "case_type",
                                        ongoingRentalAgreementCases[index].type
                                    );
                                }}
                            >
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    class="w3-left w3-circle w3-margin-right"
                                    style={{ width: "60px" }}
                                />
                                <span class="w3-right w3-opacity">
                                    {displayStatusUsingStatusCode(
                                        ongoingRentalAgreementCases[index].type
                                    )}
                                </span>
                                <h4>
                                    {
                                        ongoingRentalAgreementCases[index].user
                                            .name
                                    }
                                </h4>
                            </Link>
                            <br />
                            <hr class="w3-clear" />
                            <p style={{ display: "inline-block" }}>
                                {displayStatusUsingStatusCode(
                                    ongoingRentalAgreementCases[index].status
                                )}
                            </p>
                            <Link to={chatLink}>
                                {" "}
                                <button
                                    type="button"
                                    class="w3-button w3-theme-d2 w3-margin-bottom w3-right"
                                >
                                    <i class="fa fa-comment"></i>  Chat
                                </button>
                            </Link>
                        </div>
                    );
                }
            }

            if (this.state.dashboard.ongoingMutualDivorceCases) {
                //Active Divorce Cases
                const ongoingMutualDivorceCases =
                    this.state.dashboard.ongoingMutualDivorceCases;
                for (
                    let index = 0;
                    index < ongoingMutualDivorceCases.length;
                    index++
                ) {
                    const caseLink =
                        "/case/mutualdivorce/" +
                        ongoingMutualDivorceCases[index]._id;
                    const chatLink =
                        "/chat?room=" + ongoingMutualDivorceCases[index]._id;
                    populatedOngoingMutualDivorceCases.push(
                        <div class="w3-container w3-card w3-white w3-round w3-margin">
                            <br />
                            <Link
                                to={caseLink}
                                onClick={() => {
                                    localStorage.setItem(
                                        "case_id",
                                        ongoingMutualDivorceCases[index]._id
                                    );
                                    localStorage.setItem(
                                        "case_type",
                                        ongoingMutualDivorceCases[index].type
                                    );
                                }}
                            >
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    class="w3-left w3-circle w3-margin-right"
                                    style={{ width: "60px" }}
                                />
                                <span class="w3-right w3-opacity">
                                    {displayStatusUsingStatusCode(
                                        ongoingMutualDivorceCases[index].type
                                    )}
                                </span>
                                <h4>
                                    {ongoingMutualDivorceCases[index].user.name}
                                </h4>
                                <br />
                                <hr class="w3-clear" />
                            </Link>
                            <p style={{ display: "inline-block" }}>
                                {displayStatusUsingStatusCode(
                                    ongoingMutualDivorceCases[index].status
                                )}
                            </p>
                            <Link to={chatLink}>
                                {" "}
                                <button
                                    type="button"
                                    class="w3-button w3-theme-d2 w3-margin-bottom w3-right"
                                >
                                    <i class="fa fa-comment"></i>  Chat
                                </button>
                            </Link>
                        </div>
                    );
                }
            }

            if (this.state.dashboard.completedMutualDivorceCases) {
                const completedMutualDivorceCases =
                    this.state.dashboard.completedMutualDivorceCases;
                for (
                    let index = 0;
                    index < completedMutualDivorceCases.length;
                    index++
                ) {
                    const caseLink =
                        "/case/mutualdivorce/" +
                        completedMutualDivorceCases[index]._id;
                    const chatLink =
                        "/chat?room=" + completedMutualDivorceCases[index]._id;
                    const name = completedMutualDivorceCases[index].user.name;
                    populatedcompletedMutualDivorceCases.push(
                        <div className="lc-side-cases">
                            <p>{name}</p>
                            <p style={{ display: "inline-block" }}>
                                <Link
                                    to={caseLink}
                                    onClick={() => {
                                        localStorage.setItem(
                                            "case_id",
                                            completedMutualDivorceCases[index]
                                                ._id
                                        );
                                        localStorage.setItem(
                                            "case_type",
                                            completedMutualDivorceCases[index]
                                                .type
                                        );
                                    }}
                                >
                                    <button class="w3-button w3-block w3-theme-l4 lc-side-chatbn">
                                        Info
                                    </button>
                                </Link>
                            </p>
                            <Link to={chatLink}>
                                {" "}
                                <button
                                    type="button"
                                    class="w3-button w3-theme-d2 w3-margin-bottom w3-right lc-side-chatbn"
                                >
                                    <i class="fa fa-comment"></i>  Chat
                                </button>
                            </Link>
                        </div>
                    );
                }
            }

            if (this.state.dashboard.completedRentalAgreementCases) {
                const completedRentalAgreementCases =
                    this.state.dashboard.completedRentalAgreementCases;
                for (
                    let index = 0;
                    index < completedRentalAgreementCases.length;
                    index++
                ) {
                    const caseLink =
                        "/case/rentagreement/" +
                        completedRentalAgreementCases[index]._id;
                    const chatLink =
                        "/chat?room=" +
                        completedRentalAgreementCases[index]._id;
                    const name = completedRentalAgreementCases[index].user.name;
                    populatedcompletedRentalAgreementCases.push(
                        <div className="lc-side-cases">
                            <p>{name}</p>
                            <p style={{ display: "inline-block" }}>
                                <Link
                                    to={caseLink}
                                    onClick={() => {
                                        localStorage.setItem(
                                            "case_id",
                                            completedRentalAgreementCases[index]
                                                ._id
                                        );
                                        localStorage.setItem(
                                            "case_type",
                                            completedRentalAgreementCases[index]
                                                .type
                                        );
                                    }}
                                >
                                    <button class="w3-button w3-block w3-theme-l4 lc-side-chatbn">
                                        Info
                                    </button>
                                </Link>
                            </p>
                            <Link to={chatLink}>
                                {" "}
                                <button
                                    type="button"
                                    class="w3-button w3-theme-d2 w3-margin-bottom w3-right lc-side-chatbn"
                                >
                                    <i class="fa fa-comment"></i>  Chat
                                </button>
                            </Link>
                        </div>
                    );
                }
            }

            if (this.state.dashboard.rejectedRentalAgreementCases) {
                const rejectedRentalAgreementCases =
                    this.state.dashboard.rejectedRentalAgreementCases;
                for (
                    let index = 0;
                    index < rejectedRentalAgreementCases.length;
                    index++
                ) {
                    const caseLink =
                        "/case/rentagreement/" +
                        rejectedRentalAgreementCases[index]._id;
                    const chatLink =
                        "/chat?room=" + rejectedRentalAgreementCases[index]._id;
                    const name = rejectedRentalAgreementCases[index].user.name;
                    populatedrejectedRentalAgreementCases.push(
                        <div className="lc-side-cases">
                            <p>{name}</p>
                            <p style={{ display: "inline-block" }}>
                                <Link
                                    to={caseLink}
                                    onClick={() => {
                                        localStorage.setItem(
                                            "case_id",
                                            rejectedRentalAgreementCases[index]
                                                ._id
                                        );
                                        localStorage.setItem(
                                            "case_type",
                                            rejectedRentalAgreementCases[index]
                                                .type
                                        );
                                    }}
                                >
                                    <button class="w3-button w3-block w3-theme-l4 lc-side-chatbn">
                                        Info
                                    </button>
                                </Link>
                            </p>
                            <Link to={chatLink}>
                                {" "}
                                <button
                                    type="button"
                                    class="w3-button w3-theme-d2 w3-margin-bottom w3-right lc-side-chatbn"
                                >
                                    <i class="fa fa-comment"></i>  Chat
                                </button>
                            </Link>
                        </div>
                    );
                }
            }

            if (this.state.dashboard.rejectedMutualDivorceCases) {
                const rejectedMutualDivorceCases =
                    this.state.dashboard.rejectedMutualDivorceCases;
                for (
                    let index = 0;
                    index < rejectedMutualDivorceCases.length;
                    index++
                ) {
                    const caseLink =
                        "/case/mutualdivorce/" +
                        rejectedMutualDivorceCases[index]._id;
                    const chatLink =
                        "/chat?room=" + rejectedMutualDivorceCases[index]._id;
                    const name = rejectedMutualDivorceCases[index].user.name;
                    populatedrejectedMutualDivorceCases.push(
                        <div className="lc-side-cases">
                            <p>{name}</p>
                            <p style={{ display: "inline-block" }}>
                                <Link
                                    to={caseLink}
                                    onClick={() => {
                                        localStorage.setItem(
                                            "case_id",
                                            rejectedMutualDivorceCases[index]
                                                ._id
                                        );
                                        localStorage.setItem(
                                            "case_type",
                                            rejectedMutualDivorceCases[index]
                                                .type
                                        );
                                    }}
                                >
                                    <button class="w3-button w3-block w3-theme-l4 lc-side-chatbn">
                                        Info
                                    </button>
                                </Link>
                            </p>
                            <Link to={chatLink}>
                                {" "}
                                <button
                                    type="button"
                                    class="w3-button w3-theme-d2 w3-margin-bottom w3-right lc-side-chatbn"
                                >
                                    <i class="fa fa-comment"></i>  Chat
                                </button>
                            </Link>
                        </div>
                    );
                }
            }

            activeCases = this.state.dashboard.activeCases;
            completedCases = this.state.dashboard.completedCases;
            rejectedCases = this.state.dashboard.rejectedCases;
        }

        return (
            <>
                <div
                    class="w3-container w3-content"
                    style={{
                        maxWidth: "100%",
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
                            <div class="w3-card w3-round w3-white">
                                <div class="w3-container">
                                    <div>
                                        <h4 class="w3-center lc-side-tags">
                                            Completed Cases
                                        </h4>
                                    </div>
                                    <div className="lc-completed-cases-down">
                                        <h4 class="w3 ">Mutual Divorce</h4>
                                        <hr />
                                        <div>
                                            {populatedcompletedMutualDivorceCases.length ? (
                                                populatedcompletedMutualDivorceCases
                                            ) : (
                                                <span className="cc-msg-span">
                                                    No Cases
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="lc-completed-cases-down">
                                        <h4 class="w3">Rental Agreement</h4>
                                        <hr />
                                        <div>
                                            {populatedcompletedRentalAgreementCases.length ? (
                                                populatedcompletedRentalAgreementCases
                                            ) : (
                                                <span className="cc-msg-span">
                                                    No Cases
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-card w3-round w3-white">
                                <div class="w3-container"></div>
                            </div>
                        </div>

                        <div class="w3-col m6">
                            {populatedOngoingRentalAgreementCases.length ? (
                                populatedOngoingRentalAgreementCases
                            ) : (
                                <div class="w3-container w3-card w3-white w3-round w3-margin">
                                    <br />

                                    <span class="w3-center w3-opacity cc-message">
                                        You currently don't have any ongoing
                                        case
                                    </span>
                                </div>
                            )}
                            {populatedOngoingMutualDivorceCases}
                        </div>

                        <div class="w3-col m3">
                            <div class="w3-card w3-round w3-white w3-center">
                                <div class="w3-card w3-round">
                                    <div class="w3-white">
                                        <button class="w3-button w3-block w3-theme-l1 w3-left-align">
                                            <i class="fa fa-circle-o-notch fa-fw w3-margin-right"></i>{" "}
                                            Active Cases
                                            <span style={{ float: "right" }}>
                                                {activeCases}
                                            </span>
                                        </button>

                                        <button class="w3-button w3-block w3-theme-l1 w3-left-align">
                                            <i class="fa fa-check fa-fw w3-margin-right"></i>{" "}
                                            Completed Cases
                                            <span style={{ float: "right" }}>
                                                {completedCases}
                                            </span>
                                        </button>

                                        <button class="w3-button w3-block w3-theme-l1 w3-left-align">
                                            <i class="fa fa-times fa-fw w3-margin-right"></i>{" "}
                                            Rejected Cases{" "}
                                            <span style={{ float: "right" }}>
                                                {rejectedCases}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-card w3-round w3-white lc-rightside-cases">
                                <div class="w3-container">
                                    <div>
                                        <h4 class="w3-center lc-side-tags">
                                            Rejected Cases
                                        </h4>
                                    </div>
                                    <div className="lc-completed-cases-down">
                                        <h4 class="w3 ">Mutual Divorce</h4>
                                        <hr />
                                        <div>
                                            {populatedrejectedMutualDivorceCases.length ? (
                                                populatedrejectedMutualDivorceCases
                                            ) : (
                                                <span className="cc-msg-span">
                                                    No Cases
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="lc-completed-cases-down">
                                        <h4 class="w3">Rental Agreement</h4>
                                        <hr />
                                        <div>
                                            {populatedrejectedRentalAgreementCases.length ? (
                                                populatedrejectedRentalAgreementCases
                                            ) : (
                                                <span className="cc-msg-span">
                                                    No Cases
                                                </span>
                                            )}
                                        </div>
                                    </div>
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
