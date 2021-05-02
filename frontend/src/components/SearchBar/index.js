import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
    state = {};
    render() {
        return (
            <div className="search-box-container">
                <div className="search-box">
                    <span className="search-span">Search</span>
                    <input className="search-txt" type="text" />
                    <a href="" className="search-btn">
                        <i className="fas fa-search"></i>
                    </a>
                </div>
            </div>
        );
    }
}

export default SearchBar;
