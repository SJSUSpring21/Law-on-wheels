import React, { Component } from "react";
import ClientProfile from "../components/ClientProfile";
import SignedInNav from "../components/Navbar/SignedInNav";

class ClientProfilePage extends Component {
  render() {
    return (
      <>
       <SignedInNav />
        <ClientProfile />
       
      </>
    );
  }
}

export default ClientProfilePage;
