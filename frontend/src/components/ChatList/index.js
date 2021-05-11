import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import "./chatlist.css";
import Server from "../../webConfig";
import caseProfile from "../../images/caseProfile.jpeg";

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
    };
  }

  async componentDidMount() {
    const casesResponse = await axios.get(Server + "/chat/list", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    this.setState({ cases: casesResponse.data.cases });
  }

  render() {
    let redirectToLoginPage = null;
    if (!localStorage.getItem("token")) {
      redirectToLoginPage = <Redirect to={"/signin"} />;
    }

    const cases = this.state.cases.map((singleCase) => {
      if (singleCase.loggedInUserType === "USER")
        return (
          <div class="card-component" key={singleCase._id}>
            <img src={caseProfile} alt="Avatar" style={{ width: "100%" }} />
            <div class="container">
              <h4>
                <b>{singleCase.lawyer.name}</b>
              </h4>
              <p>{singleCase.caseType}</p>
              <p>{singleCase.status}</p>
              <Link to={"/chat?room=" + singleCase._id}>
                <button className="button">Communicate</button>
              </Link>
            </div>
          </div>
        );
      else
        return (
          <div class="card-component" key={singleCase._id}>
            <img src={caseProfile} alt="Avatar" style={{ width: "100%" }} />
            <div class="container">
              <h4>
                <b>{singleCase.user.name}</b>
              </h4>
              <p>{singleCase.caseType}</p>
              <p>{singleCase.status}</p>
              <Link to={"/chat?room=" + singleCase._id}>
                <button className="button">Communicate</button>
              </Link>
            </div>
          </div>
        );
    });

    return (
      <div className="flex-container">
        {redirectToLoginPage}
        {cases}
      </div>
    );
  }
}
