import React, { Component } from "react";
import SearchBar from "../SearchBar";
import Services from "../Services";
class ClientCenter extends Component {
    state = {};
    render() {
        return (
            <>
                <SearchBar />
                <Services />
            </>
        );
    }
}

export default ClientCenter;
